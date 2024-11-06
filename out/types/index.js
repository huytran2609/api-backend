var ERole;
(function (ERole) {
    ERole[ERole["NONE"] = 0] = "NONE";
    ERole[ERole["ADMIN"] = 1] = "ADMIN";
    ERole[ERole["STUDENT"] = 2] = "STUDENT";
})(ERole || (ERole = {}));
var ERecommendStatus;
(function (ERecommendStatus) {
    ERecommendStatus[ERecommendStatus["NONE"] = 0] = "NONE";
    ERecommendStatus[ERecommendStatus["FIRST_TIME"] = 1] = "FIRST_TIME";
    ERecommendStatus[ERecommendStatus["CHOOSEN"] = 2] = "CHOOSEN";
    ERecommendStatus[ERecommendStatus["DONE"] = 3] = "DONE";
})(ERecommendStatus || (ERecommendStatus = {}));

export { ERecommendStatus, ERole };
