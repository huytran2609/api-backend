var ELevel;
(function (ELevel) {
    ELevel[ELevel["NONE"] = 0] = "NONE";
    ELevel[ELevel["ALL_LEVELS"] = 1] = "ALL_LEVELS";
    ELevel[ELevel["BEGINNER"] = 2] = "BEGINNER";
    ELevel[ELevel["INTERMEDIATE"] = 3] = "INTERMEDIATE";
    ELevel[ELevel["EXPERT"] = 4] = "EXPERT";
})(ELevel || (ELevel = {}));
var ELanguage;
(function (ELanguage) {
    ELanguage[ELanguage["NONE"] = 0] = "NONE";
    ELanguage[ELanguage["VIETNAMESE"] = 1] = "VIETNAMESE";
    ELanguage[ELanguage["ENGLISH"] = 2] = "ENGLISH";
})(ELanguage || (ELanguage = {}));
var EApprovalsStatus;
(function (EApprovalsStatus) {
    EApprovalsStatus[EApprovalsStatus["NONE"] = 0] = "NONE";
    EApprovalsStatus[EApprovalsStatus["ACCEPT"] = 1] = "ACCEPT";
    EApprovalsStatus[EApprovalsStatus["DENY"] = 2] = "DENY";
    EApprovalsStatus[EApprovalsStatus["WATTING"] = 3] = "WATTING";
})(EApprovalsStatus || (EApprovalsStatus = {}));
var ECourseStatus;
(function (ECourseStatus) {
    ECourseStatus[ECourseStatus["NONE"] = 0] = "NONE";
    ECourseStatus[ECourseStatus["WATTING"] = 1] = "WATTING";
    ECourseStatus[ECourseStatus["OPEN"] = 2] = "OPEN";
    ECourseStatus[ECourseStatus["CLOSE"] = 3] = "CLOSE";
    ECourseStatus[ECourseStatus["FULL_ACCESS"] = 4] = "FULL_ACCESS";
})(ECourseStatus || (ECourseStatus = {}));

export { EApprovalsStatus, ECourseStatus, ELanguage, ELevel };
