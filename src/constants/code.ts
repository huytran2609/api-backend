export enum EError {
  // Sai mật khẩu
  WRONG_PASSWORD,
  // Sai tên đăng nhập
  WRONG_USERNAME,
  // Yêu cầu đăng nhập lại
  REQUIRE_RELOGIN,
  // Token không khả dụng
  TOKEN_IS_INVALID,
  // Xác minh đăng nhập lỗi, hãy cập nhật ứng dụng và thử lại
  JWT_IS_INVALID,
  // Không tìm thấy tài khoản
  USER_NOT_FOUND,
}

export enum ESuccess {}
