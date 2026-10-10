// بعد از cap sync اجرا می‌شود: آیکون پیش‌فرض را کاملاً با آیکون بازارچه جایگزین می‌کند
const fs=require('fs'),path=require('path');
const res='android/app/src/main/res';
if(!fs.existsSync(res)){console.log('no android res');process.exit(0)}
for(const d of fs.readdirSync(res).filter(x=>/^mipmap-(m|h|xh|xxh|xxxh)dpi$/.test(x))){
  fs.copyFileSync('assets/icon-fg.png',path.join(res,d,'ic_launcher_foreground.png'));
  fs.copyFileSync('assets/icon-legacy.png',path.join(res,d,'ic_launcher.png'));
  fs.copyFileSync('assets/icon-round.png',path.join(res,d,'ic_launcher_round.png'));
}
// حذف آیکون ربات/شبکه‌ی پیش‌فرض اندروید
for(const f of ['drawable-v24/ic_launcher_foreground.xml','drawable/ic_launcher_background.xml']){
  try{fs.unlinkSync(path.join(res,f))}catch(e){}
}
fs.mkdirSync(path.join(res,'values'),{recursive:true});
fs.writeFileSync(path.join(res,'values','bazaar_icon.xml'),'<?xml version="1.0" encoding="utf-8"?><resources><color name="bazaar_icon_bg">#7383a2</color></resources>');
const ad='<?xml version="1.0" encoding="utf-8"?><adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@color/bazaar_icon_bg"/><foreground android:drawable="@mipmap/ic_launcher_foreground"/></adaptive-icon>';
fs.mkdirSync(path.join(res,'mipmap-anydpi-v26'),{recursive:true});
fs.writeFileSync(path.join(res,'mipmap-anydpi-v26','ic_launcher.xml'),ad);
fs.writeFileSync(path.join(res,'mipmap-anydpi-v26','ic_launcher_round.xml'),ad);
console.log('icons replaced');
