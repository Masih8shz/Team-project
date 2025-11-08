import React, { useState, useEffect } from "react";
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
  const [formData, setFormData] = useState({ email: "", password: "", phone: "" });
  const [errors, setErrors] = useState({ email: "", password: "", phone: "" });
  const [touched, setTouched] = useState({ email: false, password: false, phone: false });
  const navigate = useNavigate();

  useEffect(() => {
    let start = performance.now();
    for (let i = 0; i < 2e6; i++) Math.sqrt(i);
    const duration = performance.now() - start;
    setHighPerformance(duration < 220);
    setChecked(true);
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "لطفاً ایمیل را وارد کنید.";
        if (!emailRegex.test(value)) return "فرمت ایمیل صحیح نیست.";
        return "";
      case "password":
        if (!value) return "لطفاً رمز عبور را وارد کنید.";
        if (value.length < 6) return "رمز باید حداقل ۶ کاراکتر باشد.";
        return "";
      case "phone":
        if (!value) return "لطفاً شماره تلفن را وارد کنید.";
        if (!phoneRegex.test(value)) return "شماره تلفن باید با 09 شروع و 11 رقم باشد.";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));

    if (touched[name]) {
      setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
  };

  const validateAll = () => {
    const e = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      phone: isLogin ? "" : validateField("phone", formData.phone),
    };
    setErrors(e);

    return !e.email && !e.password && !e.phone;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ok = validateAll();
    setTouched({ email: true, password: true, phone: true });

    if (!ok) {

      const firstError = Object.keys(errors).find((k) => errors[k]);
      const el = document.querySelector(`input[name="${firstError}"]`);
      if (el) el.focus();
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (isLogin) {
      const found = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (found) {
        localStorage.setItem("activeUser", JSON.stringify(found));
        alert("✅ ورود موفق!");
        navigate("/");
      } else {

        setErrors((p) => ({ ...p, password: "ایمیل یا رمز عبور اشتباه است." }));
      }
    } else {

      if (!validateAll()) return;
      const exists = users.some((u) => u.email === formData.email);
      if (exists) {
        setErrors((p) => ({ ...p, email: "این ایمیل قبلاً ثبت شده است." }));
        return;
      }
      const newUser = {
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("activeUser", JSON.stringify(newUser));
      alert("🎉 ثبت‌نام موفق!");
      navigate("/");
    }

    setFormData({ email: "", password: "", phone: "" });
    setTouched({ email: false, password: false, phone: false });
    setErrors({ email: "", password: "", phone: "" });
  };

  return (
    <div className="auth-container">
      {checked && (highPerformance ? <RainSceneReal /> : <RainSceneSimple />)}

      <div className="auth-form glass" role="region" aria-labelledby="auth-heading">
        <h2 id="auth-heading" className="auth-heading">
          {isLogin ? "ورود به حساب" : "ثبت‌نام"}
        </h2>

        <form className="form-inner" onSubmit={handleSubmit} noValidate>

          <label className="lbl" htmlFor="email">ایمیل</label>
          <input
            id="email"
            className={`fld ${errors.email ? "fld-error" : ""}`}
            name="email"
            type="email"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "err-email" : undefined}
          />
          {errors.email && touched.email && (
            <div id="err-email" className="field-error" role="alert">{errors.email}</div>
          )}

          <label className="lbl" htmlFor="password">رمز عبور</label>
          <input
            id="password"
            className={`fld ${errors.password ? "fld-error" : ""}`}
            name="password"
            type="password"
            placeholder="حداقل 6 کاراکتر"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "err-password" : undefined}
          />
          {errors.password && touched.password && (
            <div id="err-password" className="field-error" role="alert">{errors.password}</div>
          )}

          {!isLogin && (
            <>
              <label className="lbl" htmlFor="phone">شماره تلفن</label>
              <input
                id="phone"
                className={`fld ${errors.phone ? "fld-error" : ""}`}
                name="phone"
                type="tel"
                placeholder="0912xxxxxxxx"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "err-phone" : undefined}
              />
              {errors.phone && touched.phone && (
                <div id="err-phone" className="field-error" role="alert">{errors.phone}</div>
              )}
            </>
          )}

          <button className="btn" type="submit">{isLogin ? "ورود" : "ثبت‌نام"}</button>
        </form>

        <div className="switch" style={{ marginTop: 12 }}>
          {isLogin ? "حساب ندارید؟" : "قبلاً ثبت‌نام کرده‌اید؟"}{" "}
          <button
            className="link-btn"
            onClick={() => {
              setIsLogin((s) => !s);
              setErrors({ email: "", password: "", phone: "" });
              setTouched({ email: false, password: false, phone: false });
            }}
            type="button"
          >
            {isLogin ? "ثبت‌نام کن" : "وارد شو"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
