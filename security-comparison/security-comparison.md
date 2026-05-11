# Data Transformation Concepts | مفاهيم تحويل البيانات

A comprehensive guide comparing Hashing, Encryption, and Encoding.
دليل شامل للمقارنة بين التجزئة، التشفير، والترميز.

---

## 1. Hashing | التجزئة

### English
**Hashing** is a one-way process that transforms data into a fixed-length string (hash). It is mathematically designed so that you cannot recover the original data from the hash.
- **Key Use:** Password storage, file integrity (checksums), digital signatures.
- **Example Algorithms:** SHA-256, MD5, Argon2.

### بالعربية (التجزئة)
**التجزئة (Hashing)** هي عملية أحادية الاتجاه تقوم بتحويل البيانات إلى سلسلة نصية ذات طول ثابت. صممت رياضياً بحيث لا يمكن استعادة البيانات الأصلية من خلال التجزئة الناتجة.
- **الاستخدام الأساسي:** تخزين كلمات المرور، التحقق من سلامة الملفات، التوقيع الرقمي.
- **أمثلة الخوارزميات:** SHA-256, MD5.

---

## 2. Encryption | التشفير

### English
**Encryption** is a two-way process used for confidentiality. It transforms data into an unreadable format that can only be reversed (decrypted) if you possess the correct secret key.
- **Key Use:** Protecting sensitive data, secure communication (HTTPS), database encryption.
- **Example Algorithms:** AES, RSA, Blowfish.

### بالعربية (التشفير)
**التشفير (Encryption)** هي عملية ثنائية الاتجاه تُستخدم لضمان سرية البيانات. تقوم بتحويل البيانات إلى صيغة غير مفهومة لا يمكن استعادتها إلا بوجود المفتاح السري الصحيح.
- **الاستخدام الأساسي:** حماية البيانات الحساسة، الاتصالات الآمنة، تشفير قواعد البيانات.
- **أمثلة الخوارزميات:** AES, RSA.

---

## 3. Encoding | الترميز

### English
**Encoding** is a process used to change the format of data so it can be safely used by different systems. It is **not** for security and does not require a key. Anyone can decode it.
- **Key Use:** Sending binary data via email (Base64), URL safety, data transmission.
- **Example Algorithms:** Base64, ASCII, URL Encoding.

### بالعربية (الترميز)
**الترميز (Encoding)** هي عملية تُستخدم لتغيير تنسيق البيانات لضمان توافقها بين الأنظمة المختلفة. الترميز **ليس** غرضه الأمن ولا يتطلب مفتاحاً سرياً، حيث يمكن لأي شخص استعادة البيانات الأصلية.
- **الاستخدام الأساسي:** نقل البيانات الثنائية، تأمين الروابط (URL)، وتنسيق البيانات للنقل.
- **أمثلة الخوارزميات:** Base64, ASCII.

---

## Comparison Summary | ملخص المقارنة

| Feature | Hashing (التجزئة) | Encryption (التشفير) | Encoding (الترميز) |
| :--- | :--- | :--- | :--- |
| **Purpose** | Integrity (التحقق) | Secrecy (السرية) | Compatibility (التوافق) |
| **Reversible?** | No (لا) | Yes (With Key) | Yes (No Key) |
| **Output Length** | Fixed (ثابت) | Variable (متغير) | Variable (متغير) |
| **Common Example** | SHA-256 | AES | Base64 |
