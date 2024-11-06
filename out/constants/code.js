var EError;
(function (EError) {
    // Sai mật khẩu
    EError[EError["WRONG_PASSWORD"] = 0] = "WRONG_PASSWORD";
    // Sai tên đăng nhập
    EError[EError["WRONG_USERNAME"] = 1] = "WRONG_USERNAME";
    // Yêu cầu đăng nhập lại
    EError[EError["REQUIRE_RELOGIN"] = 2] = "REQUIRE_RELOGIN";
    // Token không khả dụng
    EError[EError["TOKEN_IS_INVALID"] = 3] = "TOKEN_IS_INVALID";
    // Xác minh đăng nhập lỗi, hãy cập nhật ứng dụng và thử lại
    EError[EError["JWT_IS_INVALID"] = 4] = "JWT_IS_INVALID";
    // Không tìm thấy tài khoản
    EError[EError["USER_NOT_FOUND"] = 5] = "USER_NOT_FOUND";
})(EError || (EError = {}));

export { EError };
