## vizuroHR

## intall

`npm i`

## 上下班 checkin，會自動辨識上下午，自動判斷是不是平常日

`node checkin.js`


## 請拷貝 `example.env` 成 `.env` ，然後修改一下變數
USERNAME=使用者帳號
PASSWORD=使用者密碼
USER_ID=詢問我
DELAY_MIN_MINUTE=任務開始後最少延遲幾分鐘
DELAY_MAX_MINUTE=任務開始後最多延遲幾分鐘

## 預設 2020 補班；禮拜六要上班
ENABLE_DAY=20200212,20200215,20200620,20200926

## 預設 2020 補假；平常日可休假
DISABLE_DAY=20200228,20200403,20200501,20200625,20200626,20201001,20201002,20201009


## crontab 設定

 - 下指令
 
 `crontab -e`
 
 - 每天9點與18點執行；js 會自動判斷是不是平常日，所以 crontab 每天執行就好
 
 `00 9,18 * * * node /home/vizuro/BeemoLin/vizuroHR/checkin.js`
