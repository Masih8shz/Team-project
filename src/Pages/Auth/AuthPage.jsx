import { useState, useEffect } from "react";
import RainSceneReal from "./RainSceneReal";
import RainSceneSimple from "./RainSceneSimple";
import "../../Styles/AuthPage.css";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^09\d{9}$/;

const AuthPage = () => {
  const [highPerformance, setHighPerformance] = useState(false);
  const [checked, setChecked] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    captchaInput: "",
  });

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const [captcha, setCaptcha] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: true,
    password: true,
    phone: true,
    captcha: true,
    otp: true,
  });

  useEffect(() => {
    let start = performance.now();
    for (let i = 0; i < 2e6; i++) Math.sqrt(i);
    const duration = performance.now() - start;
    setHighPerformance(duration < 220);
    setChecked(true);
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(code);
  };

  const liveValidate = (field, value) => {
    let updated = { ...errors };

    if (field === "email") updated.email = !emailRegex.test(value);
    if (field === "password") updated.password = value.length < 6;
    if (field === "phone") updated.phone = !phoneRegex.test(value);
    if (field === "captchaInput") updated.captcha = value !== captcha;
    if (field === "otp") updated.otp = value.length !== 6;

    setErrors(updated);
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    liveValidate(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      if (errors.email || errors.password) return;

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const found = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (found) {
        localStorage.setItem("activeUser", JSON.stringify(found));
        navigate("/");
      } else {
        alert("ایمیل یا رمز اشتباه است");
      }
      return;
    }

    if (step === 1) {
      if (errors.email || errors.password || errors.phone || errors.captcha)
        return;

      const code = String(Math.floor(100000 + Math.random() * 900000));
      setGeneratedOtp(code);
      setStep(2);
      return;
    }

    if (step === 2) {
      if (otp !== generatedOtp) {
        alert("کد پیامک نادرست است");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const newUser = {
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("activeUser", JSON.stringify(newUser));

      navigate("/");
    }
  };

  const renderValidationIcon = (field) => {
    return (
      <span className={`input-icon ${errors[field] ? "invalid" : "valid"}`}>
        {errors[field] ? "✖" : "✔"}
      </span>
    );
  };

  return (
    <div className="auth-container">
      {checked && (highPerformance ? <RainSceneReal /> : <RainSceneSimple />)}

      <div className="auth-form glass">
        <h2>{isLogin ? "ورود" : step === 1 ? "ثبت‌نام" : "تأیید شماره"}</h2>

        <form className="form-inner" onSubmit={handleSubmit}>
          {isLogin && (
            <>
              <label>ایمیل</label>
              <div className="input-wrapper">
                <input
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
                {renderValidationIcon("email")}
              </div>

              <label>رمز عبور</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                />
                {renderValidationIcon("password")}
              </div>
            </>
          )}

          {!isLogin && step === 1 && (
            <>
              <label>ایمیل</label>
              <div className="input-wrapper">
                <input
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
                {renderValidationIcon("email")}
              </div>

              <label>رمز عبور (حداقل 6 کاراکتر)</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                />
                {renderValidationIcon("password")}
              </div>

              <label>شماره موبایل</label>
              <div className="input-wrapper">
                <input
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
                {renderValidationIcon("phone")}
              </div>

              <label>کد امنیتی</label>
              <div className="captcha-box">
                <span className="captcha-text">{captcha}</span>
                <svg className="captcha-lines">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <line
                      key={i}
                      x1={Math.random() * 120}
                      y1={Math.random() * 40}
                      x2={Math.random() * 120}
                      y2={Math.random() * 40}
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="2"
                    />
                  ))}
                </svg>
              </div>

              <div className="input-wrapper">
                <input
                  placeholder="کد را وارد کنید"
                  value={formData.captchaInput}
                  onChange={(e) => updateField("captchaInput", e.target.value)}
                />
                {renderValidationIcon("captcha")}
              </div>
            </>
          )}

          {!isLogin && step === 2 && (
            <>
              <label>کد پیامکی</label>
              <div className="input-wrapper">
                <input
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => updateField("otp", e.target.value)}
                />
                {renderValidationIcon("otp")}
              </div>
            </>
          )}

          <button type="submit">
            {isLogin ? "ورود" : step === 1 ? "ارسال پیامک" : "تأیید و ثبت‌نام"}
          </button>
        </form>

        <div className="switch">
          {isLogin ? "حساب ندارید؟" : "قبلاً حساب دارید؟"}{" "}
          <button
            className="link-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setStep(1);
            }}
          >
            {isLogin ? "ثبت‌نام" : "ورود"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
