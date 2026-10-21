# Store Manager - Angular Full Project

مشروع إدارة متجر إلكتروني مبني باستخدام **Angular (NgModule architecture)** و **FakeStore API**.

## المميزات المغطاة في المشروع
- **Architecture:** مقسم إلى `AppModule`, `AppRoutingModule`, و `ProductsModule` مع تنظيم الفولدرات (`models`, `services`, `pipes`, `shared`, `core`, `products`).
- **Routing:** 5 مسارات شغالة بالكامل (`/`, `/products`, `/products/:id`, `/add-product`, `**` لصفحة 404) مع `routerLink` و `routerLinkActive` والتنقل البرمجي بـ `Router`.
- **Service & HTTP:** `ProductService` محقون بـ Dependency Injection ويتعامل مع `HttpClient` لجلب، عرض، إضافة، وحذف المنتجات مع الاحتفاظ بنسخة محلية (Single Source of Truth) ومعالجة الأخطاء.
- **Data Binding & Directives:** تغطية الأنواع الأربعة (Interpolation, Property Binding, Event Binding, Two-way Binding `[(ngModel)]`) بالإضافة إلى `*ngFor`, `*ngIf`, `[ngClass]`, `[ngStyle]`.
- **Component Communication:** تواصل بين `ProductListComponent` (Parent) و `ProductCardComponent` (Child) باستخدام `@Input()` و `@Output()`.
- **Pipes:** استخدام Built-in Pipes (`currency`, `uppercase`, `date`) بالإضافة إلى Custom Pipe (`TruncatePipe`) لقص الوصف الطويل.

## خطوات التشغيل
1. فك الضغط عن الملف والدخول إلى الفولدر:
   ```bash
   cd store-manager
   ```
2. تنصيب الحزم (Dependencies):
   ```bash
   npm install
   ```
3. تشغيل السيرفر المحلي:
   ```bash
   ng serve
   ```
   أو:
   ```bash
   npm start
   ```
4. افتح المتصفح على الرابط: `http://localhost:4200`
