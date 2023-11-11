import { useMediaQuery } from "@mui/material";
import cookie from "js-cookie";
import isEmpty from "lodash/isEmpty";

import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { CommonContext } from "../../components/helper/commonContext";
import login from "../../components/Layout/util/login";
import trackEvents from "../../src/utils/trackEvent";
import eventBus from "../../util/eventBus";
import fetcher from "../dataProvider";
import { setToken, setUserDetail } from "../redux/actions";
import { setUserData } from "../redux/slices/user";
import useLocalStorage from "./useLocalStorage";

const useGoogleLogin = () => {
  const [isGoogleLoginSuccess, setIsGoogleLoginSuccess] = useState(false);
  const { onBoardingData } = useSelector((state) => state.onBoarding);
  const dispatch = useDispatch();

  const [, setAccessToken] = useLocalStorage("accessToken", null);
  const [, setRefreshToken] = useLocalStorage("refreshToken", null);
  const commonContext = useContext(CommonContext);
  const { isLoggedIn, languagePrefNameObj, userData } = useSelector(
    (state) => state.user
  );
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:768px)");

  const { mutate: loginGoogle } = useMutation(
    ({ id_token, referralCode, deviceId, userId }) =>
      fetcher.post(`v1/auth/login-google`, {
        id_token,
        referralCode,
        deviceId,
        userId,
      }),
    {
      onSuccess: (res) => {
        dispatch(setUserData(res?.user));
        const accessToken = res.tokens?.access?.token;
        const refreshToken = res.tokens?.refresh?.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("userCreatedTime", res?.user?.createdAt);
        }

        trackEvents("Googlelogin", {
          data: {
            Status: "success",
            deviceSource: isMobile ? "Mweb" : "Web",
            Method: "google",
            userId: res?.user?.id,
            userStatus: isLoggedIn ? "loggedIn" : "Guest",
          },
          all: true,
        });

        cookie.set("token", refreshToken, { expires: 2 });
        let ga_cookies = res?.user?.googleAnalyticsId || [];
        let isNewGAFound = !ga_cookies.includes(cookie.get("_ga"));
        let askForLang = !!!res?.user.languagePreference?.length;
        if (isNewGAFound || askForLang) {
          ga_cookies = [...ga_cookies, cookie.get("_ga")];
          updateGACookiesAndOnBoardingLanguage({
            id: res?.user?.id,
            GA_Ids: ga_cookies,
            onBoardingLanguage: askForLang
              ? onBoardingData?.selectedLanguage || []
              : res?.user?.languagePreference,
          });
        }
        setIsGoogleLoginSuccess(true);
        login(
          res.tokens.access.token,
          res.user.name,
          res.user.email,
          res?.user?.mobile,
          res.user.id,
          res.user.role,
          res.user.roles
        );

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        dispatch(
          setToken({
            accessToken: accessToken,
            accessToken: refreshToken,
            isLoggedIn: true,
          })
        );

        dispatch(
          setUserDetail({
            ...res.user,
          })
        );
        GetWalletblance();
        if (window != "undefined") {
          if (
            isEmpty(res.user?.mobile) &&
            (localStorage.getItem("nftAction") == "BuyNFT" ||
              localStorage.getItem("nftAction") == "SellNFT")
          ) {
            eventBus.dispatch("openCapturePhoneModal", {
              function_name: "capturephone",
            });
          } else {
            commonContext.setMobileUpdated(true);
            if (localStorage.getItem("nftAction") == "openNormalCalculator") {
              commonContext.setCalculator(true);
            } else if (localStorage.getItem("nftAction") == "BuyNFT") {
              if (localStorage?.getItem("is_tradable") == "true") {
                router.push({
                  pathname: "/payment/BuyTradeNft",
                  query: { tier_id: localStorage?.getItem("tierId") },
                });
              } else if (
                localStorage?.getItem("is_tradable") == "marketPlace"
              ) {
                router.push({
                  pathname: "/payment/market-place-buy",
                  query: { tier_id: localStorage?.getItem("tierId") },
                });
              } else {
                router.push({
                  pathname: "/payment/BuyNowNft",
                  query: { tier_id: localStorage?.getItem("tierId") },
                });
              }
            }
          }
        }
      },
      onError: () => {
        dispatch(
          setToken({
            accessToken: null,
            accessToken: null,
            isLoggedIn: false,
          })
        );
      },
    }
  );

  const { mutate: GetWalletblance } = useMutation(
    () => fetcher.get(`v1/wallet/balance`),
    {
      onSuccess: (res) => {
        commonContext.setWalletBalance(res?.balance);
        commonContext.setFantigerCoin(res?.fantigerCoin || 0);
        commonContext.setRedeemableFantigerCoin(
          res?.redeemableFantigerCoin || 0
        );
        commonContext.setMaxCoin(res?.fantigerCoinRedeemPercentage || 20);
        if (typeof window !== "undefined") {
          localStorage.setItem("walletBalance", res.balance);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const { mutate: updateGACookiesAndOnBoardingLanguage } = useMutation(
    ({ id, GA_Ids, onBoardingLanguage }) =>
      fetcher.patch(`/v1/user/${id}`, {
        googleAnalyticsId: GA_Ids,
        languagePreference: onBoardingLanguage,
      }),
    {
      onSuccess: (response) => {
        dispatch(setUserData(response));
      },
      onError: (error) => {
        console.log("Error", error?.response?.data);
      },
    }
  );

  return [isGoogleLoginSuccess, loginGoogle];
};

export default useGoogleLogin;
