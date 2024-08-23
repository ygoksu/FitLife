import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { newpassword } from "../config/firebase";
import React from "react";
const SifremiUnuttum = () => {
  const [email, setEmail] = useState("");

  const onChangeFunc = (e) => {
    setEmail(e.target.value);
  };

  const dogrula = () => {
    // E-posta adresini doğrulayın.
    if (!email.trim()) {
      alert("E-posta adresi girin.");
      return;
    }

    newpassword(email);
    //Şifre sıfırlama bağlantısı oluşturun.
    //sendPasswordResetEmail(firebaseConfig.auth, email);

    // Kullanıcıyı `/reset-password` sayfasına yönlendirin.
    //window.location.href = "/reset-password";
  };



  return (
    <div
    className="row justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card" style={{ width: "400px" }}> 
        <h1>Şifremi Unuttum</h1>
        <div className="input-group-prepend"> 
          E-posta adresinizi girin ve şifre sıfırlama bağlantısı alacaksınız.
        </div>

        <div className="input-group-prepend">

        <span className="input-group-text" id="addon-wrapping">
            @
          </span>

          <input
            name="email"
            value={email}
            onChange={onChangeFunc}
            type="email"
            className="form-control "
            placeholder="Email"
          />

        </div>
        
        <div onClick={dogrula} type="button" className="btn btn-success">
                  Onay Gönder
        </div>
        
      </div>
      
    </div>
  );
};

export default SifremiUnuttum;
