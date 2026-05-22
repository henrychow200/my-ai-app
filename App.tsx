
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  User, 
  Search, 
  Droplets, 
  Check, 
  ArrowRight,
  Zap, 
  Sparkles, 
  Loader2, 
  Plus, 
  X, 
  RefreshCw, 
  Send,
  Scale,
  Users,
  ChevronDown,
  Trash2,
  History,
  Clock,
  Eye, 
  Maximize2, 
  Brain, 
  Shield, 
  Moon,
  ArrowLeft,
  Activity,
  Video,
  Info
} from 'lucide-react';

// --- 介面文字字典 ---
const translations: Record<string, any> = {
  zh: {
 setupTitle: "家庭健康中心",
 familyHelp: "👨‍👩‍👧‍👦 家庭共享模式：您可以為家中長者建立檔案，協助他們跨越數碼鴻溝，管理健康。",
 addProfile: "新增家庭成員",
 switchProfile: "切換身份",
 currentProfile: "當前管理",
 deleteProfile: "刪除檔案",
 confirmDelete: "確認刪除?",
 cancel: "取消",
 dashboardGreeting: "今天的關懷，是家人健康的基石。💪",
 remaining: "今日剩餘",
 kcalUnit: "KCAL 剩餘",
 bmi: "BMI",
 water: "今日飲水",
 searchPlaceholder: "智慧搜尋：輸入「橙」、「雞肉飯」...",
 aiBtn: "AI 識別",
 aiRec: "智性 AI 配餐",
 aiSub: "人性化份量優化",
 catTitle: "數據庫瀏覽",
 height: "身高 (CM)",
 weight: "體重 (KG)",
 age: "年齡",
 gender: "性別",
 male: "男",
 female: "女",
 activity: "運動習慣",
 statusNormal: "體重正常",
 statusUnder: "體重過輕",
 statusOver: "過重 / 胖",
 customWater: "自訂份量 (ml)",
 add: "加入",
 quickAdd: "選擇飲水量",
 profile: "家庭設定",
 refresh: "換一批",
 breakfast: "健康早餐",
 lunch: "家常午餐",
 dinner: "豐盛晚餐",
 ingredients: "食材與份量",
 method: "烹飪方法",
 nutritionalInfo: "營養資訊 (每份)",
 addIntake: "確認加入今日攝取",
 aiSearching: "AI 正在分析營養...",
 aiSearchBtn: "AI 分析營養",
 selectPortion: "請選擇份量",
 portionUnit: "份量",
 foodBriefTitle: "食物簡介",
 refinementTitle: "AI 需要更多細節",
 refinementPlaceholder: "例如：很大份、非常油、加了甜醬...",
 refinementConfirm: "確認細節並分析",
 aiMentor: "AI 營養導師",
 aiMentorLabel: "AI 營養師",
 aiChatPlaceholder: "問問我營養建議...",
 aiChatDisclaimer: "💡 提示：AI 建議僅供參考，不具專業醫療診斷效力。如有疑問請諮詢專業醫師。",
 aiChatWelcome: "你好！我是你的 AI 營養導師。根據你的數據，我能為你提供精準的飲食建議。今天想了解什麼？",
 dbSearchPlaceholder: "搜尋食物名稱...",
 dbAll: "全部",
 dbSubgroups: "子群組瀏覽",
 customPortionLabel: "自訂克數 (g)",
 customPortionHint: "輸入精確重量進行計算",
 nameLabel: "暱稱 (如: 爺爺)",
 createProfileBtn: "建立檔案",
 historyTitle: "今日飲食紀錄",
 noHistory: "尚無紀錄，快去新增第一筆吧！",
 deleteRecord: "刪除紀錄",
 actionMenuTitle: "快速行動",
 shapeStretchTitle: "形伸營",
 shapeStretchDesc: "四大機能修復：針對性解決亞健康",
 catEye: "久坐護眼護頸",
 catEyeDesc: "改善螢幕僵硬",
 catCirculation: "碎片循環活絡",
 catCirculationDesc: "狹窄空間適用：促進血液循環",
 catStress: "深層舒壓伸展",
 catStressDesc: "釋放壓力：緩解肩背緊繃",
 catCore: "防跌核心預防",
 catCoreDesc: "強化核心：預防跌倒與勞損",
 catSleep: "睡前放鬆",
 catSleepDesc: "感知當下狀態，AI 推薦修復計畫",
 back: "返回",
 startExercise: "開始",
 equipment: "器材",
 chair: "🪑 椅子",
 band: "🎗️ 彈力帶",
 bodyweight: "🧘 徒手",
 generateVideo: "✨ AI 生成示範影片",
 generating: "AI 導演拍攝中 (約需 1-2 分鐘)...",
 videoError: "影片生成失敗，請重試",
 tabAll: "全部",
 tabStretch: "🧘 伸展",
 tabExercise: "⚡ 運動",
 satFat: "飽和脂肪",
 transFat: "反式脂肪",
 sodium: "鈉含量",
 sugar: "糖份",
 nuVisionTitle: "NuVision 智能街市",
 marketChallenge: "街市採購挑戰",
 budgetGoal: "預算 $50 • 目標：均衡一餐",
 remainingBudget: "剩餘預算",
 selectedItems: "已選食材",
 all: "全部",
 grains: "穀物",
 meat: "肉類",
 fruits: "水果",
 veggies: "蔬菜",
 nutritionScore: "營養均衡評分",
 macroRatio: "三大營養素比例",
 protein: "蛋白質",
 carbs: "碳水",
 fat: "脂肪",
 deepAnalysis: "深度解析 (隱藏陷阱)",
 hiddenNutrients: "隱藏營養素",
 aiAdvice: "AI 營養導師建議",
 scanNext: "掃描下一組 (Scan Next)",
 aiAnalyzing: "AI 正在深度解析...",
 aiAnalyzeBtn: "AI 分析",
 editProfile: "編輯檔案",
 familyMembers: "家庭成員",
 hydrationTimer: "補水計時",
 maxItems: "最多選擇 4 樣食材 (Max 4 items)",
 overBudget: "超出預算！(Over Budget)",
 analysisFailed: "分析失敗，請重試 (Analysis failed)",
 },
  en: {
 setupTitle: "Family Health Hub",
 familyHelp: "👨‍👩‍👧‍👦 Family Sharing: Create profiles for elders to help them bridge the digital divide and manage health.",
 addProfile: "Add Family Member",
 switchProfile: "Switch Profile",
 currentProfile: "Managing",
 deleteProfile: "Delete Profile",
 confirmDelete: "Confirm Delete?",
 cancel: "Cancel",
 dashboardGreeting: "Caring today builds family health tomorrow. 💪",
 remaining: "Remaining",
 kcalUnit: "KCAL Left",
 bmi: "BMI",
 water: "Water Intake",
 searchPlaceholder: "Smart search...",
 aiBtn: "AI Scan",
 aiRec: "AI Meal Plan",
 aiSub: "Personalized Portions",
 catTitle: "Database",
 height: "Height (CM)",
 weight: "Weight (KG)",
 age: "Age",
 gender: "Gender",
 male: "Male",
 female: "Female",
 activity: "Activity Level",
 statusNormal: "Normal",
 statusUnder: "Underweight",
 statusOver: "Overweight",
 customWater: "Custom (ml)",
 add: "Add",
 quickAdd: "Select Amount",
 profile: "Family Setup",
 refresh: "Refresh",
 breakfast: "Breakfast",
 lunch: "Lunch",
 dinner: "Dinner",
 ingredients: "Ingredients",
 method: "Cooking Method",
 nutritionalInfo: "Nutrition Info",
 addIntake: "Confirm Intake",
 aiSearching: "AI analyzing...",
 aiSearchBtn: "AI Analysis",
 selectPortion: "Select Portion",
 portionUnit: "Portion",
 foodBriefTitle: "Brief Info",
 refinementTitle: "AI Needs More Details",
 refinementPlaceholder: "e.g., Large portion, very oily...",
 refinementConfirm: "Confirm & Analyze",
 aiMentor: "AI Nutrition Mentor",
 aiMentorLabel: "AI Mentor",
 aiChatPlaceholder: "Ask me for advice...",
 aiChatDisclaimer: "💡 Note: AI advice is for reference only and not for medical diagnosis.",
 aiChatWelcome: "Hello! I am your AI Nutrition Mentor. How can I help you today?",
 dbSearchPlaceholder: "Search food name...",
 dbAll: "All",
 dbSubgroups: "Subgroups",
 customPortionLabel: "Custom Weight (g)",
 customPortionHint: "Enter weight for precise calculation",
 nameLabel: "Nickname (e.g. Grandpa)",
 createProfileBtn: "Create Profile",
 historyTitle: "Today's Log",
 noHistory: "No records yet. Add your first meal!",
 deleteRecord: "Delete Record",
 actionMenuTitle: "Quick Actions",
 shapeStretchTitle: "Shape & Stretch",
 shapeStretchDesc: "Targeted Solutions for Sub-health",
 catEye: "Eye & Neck Care",
 catEyeDesc: "Recommended: Fix Screen Stiffness",
 catCirculation: "Circulation Boost",
 catCirculationDesc: "Small Spaces: Boost Blood Flow",
 catStress: "Deep Stress Relief",
 catStressDesc: "Release Tension: Soothe Shoulders",
 catCore: "Anti-fall Core",
 catCoreDesc: "Strengthen Core: Prevent Falls",
 catSleep: "Pre-sleep Relax",
 catSleepDesc: "AI Recommended Repair Plan",
 back: "Back",
 startExercise: "Start",
 equipment: "Equip",
 chair: "🪑 Chair",
 band: "🎗️ Band",
 bodyweight: "🧘 Body",
 generateVideo: "✨ AI Video Demo",
 generating: "AI Director filming (1-2 mins)...",
 videoError: "Generation failed, try again",
 tabAll: "All",
 tabStretch: "🧘 Stretch",
 tabExercise: "⚡ Exercise",
 satFat: "Sat. Fat",
 transFat: "Trans Fat",
 sodium: "Sodium",
 sugar: "Sugar",
 nuVisionTitle: "NuVision Smart Market",
 marketChallenge: "Market Challenge",
 budgetGoal: "Budget $50 • Goal: Balanced Meal",
 remainingBudget: "Remaining Budget",
 selectedItems: "Selected Items",
 all: "All",
 grains: "Grains",
 meat: "Meat",
 fruits: "Fruits",
 veggies: "Veggies",
 nutritionScore: "Nutrition Score",
 macroRatio: "Macro Ratio",
 protein: "Protein",
 carbs: "Carbs",
 fat: "Fat",
 deepAnalysis: "Deep Analysis (Hidden Traps)",
 hiddenNutrients: "Hidden Nutrients",
 aiAdvice: "AI Nutrition Advice",
 scanNext: "Scan Next",
 aiAnalyzing: "AI Analyzing...",
 aiAnalyzeBtn: "AI Analyze",
 editProfile: "Edit Profile",
 familyMembers: "Family Members",
 hydrationTimer: "Hydration Timer",
 maxItems: "Max 4 items",
 overBudget: "Over Budget!",
 analysisFailed: "Analysis failed, try again",
 },
};

interface FoodDatabaseItem {
  id: string;
  name: string;
  category: string;
  subgroup?: string;
  emoji: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string;
  method: string[];
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface Recipe {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'dinner';
  emoji: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  saturatedFat: number;
  transFat: number;
  sodium: number;
  sugar: number;
  ingredients: string;
  method: string[];
}

interface AiPortion {
  label: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  saturatedFat?: number;
  transFat?: number;
  sodium?: number;
  sugar?: number;
  isCustomBase?: boolean;
}

interface AiSearchResult {
  needsMoreInfo: boolean;
  promptMessage?: string;
  name?: string;
  emoji?: string;
  brief?: string;
  portions?: AiPortion[];
}

interface ProgressBarProps {
  label: string;
  current: number;
  target: number;
  unit: string;
}

interface LogEntry {
  id: string;
  name: string;
  emoji: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

interface UserProfile {
  id: string;
  name: string;
  height: string;
  weight: string;
  age: string;
  gender: string;
  activity: string;
  logs: LogEntry[]; 
  waterIntake: number;
  avatarColor: string;
}

interface Exercise {
  id: string;
  name: string;
  duration: string;
  instruction: string;
  equipment: 'chair' | 'band' | 'bodyweight';
  type: 'stretch' | 'exercise';
  demoVideoUrl?: string;
  sets?: string;
}

// --- SHAPE & STRETCH CONTENT ---
const SHAPE_STRETCH_CONTENT: Record<string, Exercise[]> = {
  catEye: [
    { id: 'e_s1', name: '頸部側拉 (Neck Side Stretch)', duration: '30秒/邊', sets: '3組', instruction: '站立或坐姿，單手固定對側肩膀，頭部輕輕向同側傾斜。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/1.mp4' },
    { id: 'e_s2', name: '抬頭望天 (Neck Extension)', duration: '15秒', sets: '3組', instruction: '雙手交疊按住胸口皮膚，慢慢抬頭向上延伸頸部前側。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/2.mp4' },
    { id: 'e_s3', name: '低頭伸展 (Neck Flexion)', duration: '15秒', sets: '3組', instruction: '雙手輕抱後腦勺，輕輕向下壓，下巴找鎖骨，伸展後頸。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/3.mp4' },
    { id: 'e_s4', name: '轉頭側視 (Neck Rotation)', duration: '10次', sets: '3組', instruction: '保持肩膀不動，頭部緩慢向左轉到底，再向右轉到底。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/4.mp4' },
    { id: 'e_s5', name: '擴胸伸展 (Chest Opener)', duration: '20秒', sets: '3組', instruction: '站立，雙手在背後十指交扣，向後向下延伸，挺胸看前方。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/5.mp4' },
    { id: 'e_s6', name: '手腕伸展 (Wrist Extensor)', duration: '15秒/邊', sets: '3組', instruction: '手臂伸直掌心向外，另一手將手指輕輕向後扳。', equipment: 'bodyweight', type: 'stretch' },
    { id: 'e_s7', name: '上斜方肌伸展 (Upper Trap)', duration: '20秒/邊', sets: '3組', instruction: '站姿，一手置於背後，頭向對側傾斜並微微轉向腋下。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/7.mp4' },
    { id: 'e_s8', name: '鷹式手部 (Eagle Arms)', duration: '15秒', sets: '3組', instruction: '雙臂交纏，手肘抬高至肩膀高度，伸展上背部。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/8.mp4' },
    { id: 'e_s9', name: '靠牆胸肌伸展 (Wall Pec)', duration: '20秒/邊', sets: '3組', instruction: '前臂抵住門框或牆角，身體向前傾，感受胸大肌拉伸。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/9.mp4' },
    { id: 'e_s10', name: '眼球極限轉動 (Eye Circles)', duration: '30秒', sets: '3組', instruction: '順時針轉動眼球至極限位置，再逆時針轉動。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/10.mp4' },
    { id: 'e_e1', name: '站姿收下巴 (Chin Tucks)', duration: '10次', sets: '3組', instruction: '背貼牆站立，後腦勺用力頂牆，擠出雙下巴，強化深層頸屈肌。', equipment: 'bodyweight', type: 'exercise' },
    { id: 'e_e2', name: '彈力帶開胸 (Band Pull Apart)', duration: '15次', sets: '3組', instruction: '雙手握彈力帶平舉，向兩側拉開至觸胸，夾緊肩胛。', equipment: 'band', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/12.MOV' },
    { id: 'e_e3', name: '眼球8字操 (Figure 8)', duration: '1分鐘', sets: '3組', instruction: '頭不動，視線在前方畫橫向8字，訓練眼部肌肉協調。', equipment: 'bodyweight', type: 'exercise' },
    { id: 'e_e4', name: '遠近聚焦 (Focus Shift)', duration: '10次', sets: '3組', instruction: '伸出拇指，視線在拇指與遠方物體間快速切換。', equipment: 'bodyweight', type: 'exercise' },
    { id: 'e_e5', name: '站姿聳肩 (Standing Shrugs)', duration: '15次', sets: '3組', instruction: '雙肩用力向上聳起找耳朵，停留1秒後放下。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/15.MOV' },
    { id: 'e_e6', name: '肩胛後收 (Scapular Squeeze)', duration: '15次', sets: '3組', instruction: '站立，手肘彎曲90度貼身，向後夾緊背部肌肉。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/16.mp4' },
    { id: 'e_e7', name: '頸部等長抗阻 (Iso Neck)', duration: '10秒/向', sets: '3組', instruction: '站姿，手掌抵住額頭/後腦/側面，頭用力頂手，手用力頂頭。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/17.mp4' },
    { id: 'e_e8', name: '牆壁天使 (Wall Angels)', duration: '10次', sets: '3組', instruction: '背貼牆站立，雙臂貼牆上下滑動，改善圓肩。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/18.mp4' },
    { id: 'e_e9', name: '站姿W字 (Standing W)', duration: '15次', sets: '3組', instruction: '站立，雙臂舉起呈W字型，向後夾背，胸口挺出。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/19.mp4' },
    { id: 'e_e10', name: '彈力帶面拉 (Face Pull)', duration: '12次', sets: '3組', instruction: '站姿，將彈力帶固定高處，雙手拉向面部，手肘向外打開。', equipment: 'band', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/20.mp4' }
  ],
  catCirculation: [
    { id: 'c_s1', name: '站姿腿後伸展 (Standing Hamstring)', duration: '20秒/邊', sets: '3組', instruction: '單腳跟著地，腳尖勾起，臀部向後坐，雙手輕扶大腿。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/21.MOV' },
    { id: 'c_s2', name: '扶椅股四頭肌 (Quad Stretch)', duration: '20秒/邊', sets: '3組', instruction: '站立扶椅背，一手抓同側腳踝向後提，膝蓋併攏。', equipment: 'chair', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/22.MOV' },
    { id: 'c_s3', name: '推牆小腿伸展 (Calf Stretch)', duration: '20秒/邊', sets: '3組', instruction: '雙手推牆，弓箭步，後腳跟踩死地板。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/23.MOV' },
    { id: 'c_s4', name: '腳踝繞環 (Ankle Circles)', duration: '10圈/邊', sets: '3組', instruction: '單腳站立(可扶牆)，抬起一腳，腳尖畫大圈。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/24.MOV' },
    { id: 'c_s5', name: '站姿4字伸展 (Standing Figure 4)', duration: '20秒/邊', sets: '3組', instruction: '手扶椅背或牆，將一腳腳踝置於另一腿膝蓋上，向下蹲坐。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalance/25.MOV' },
    { id: 'c_s6', name: '站姿體側伸展 (Side Reach)', duration: '15秒/邊', sets: '3組', instruction: '一手插腰，一手舉高向對側延伸，拉開肋骨。', equipment: 'bodyweight', type: 'stretch' },
    { id: 'c_s7', name: '手指張合 (Finger Spread)', duration: '15次', sets: '3組', instruction: '用力張開五指，再用力握拳，促進末梢循環。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/nubalance/27.MOV' },
    { id: 'c_s8', name: '手臂交叉伸展 (Shoulder Cross)', duration: '15秒/邊', sets: '3組', instruction: '一臂橫過胸前，另一手勾住拉向身體。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/nubalance/28.MOV' },
    { id: 'c_s9', name: '弓箭步髖屈伸展 (Lunge Stretch)', duration: '20秒/邊', sets: '3組', instruction: '站姿弓箭步，後腿膝蓋微彎向下，骨盆前推。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/nubalance/29.MOV' },
    { id: 'c_s10', name: '足底伸展 (Plantar Stretch)', duration: '20秒', sets: '3組', instruction: '腳尖踩在台階邊緣或牆角，腳跟向下壓。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/nubalance/30.MOV' },
    { id: 'c_e1', name: '原地踏步 (Marching in Place)', duration: '1分鐘', sets: '3組', instruction: '站立，背部挺直，雙臂自然擺動，大腿交替抬高至水平。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/31.MOV' },
    { id: 'c_e2', name: '站姿提踵 (Standing Calf Raises)', duration: '20次', sets: '3組', instruction: '站立，雙腳與肩同寬，墊起腳尖停留1秒，慢慢放下。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/32.MOV' },
    { id: 'c_e3', name: '站姿開合跳 (Low Impact Jacks)', duration: '20次', sets: '3組', instruction: '站立，單腳向側邊點地，雙手同時舉高，左右交替，不跳躍。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/33.MOV' },
    { id: 'c_e4', name: '半深蹲 (Half Squats)', duration: '15次', sets: '3組', instruction: '站立，臀部向後坐像是要坐椅子，膝蓋不超過腳尖，站起夾臀。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/34.MOV' },
    { id: 'c_e5', name: '站姿後踢臀 (Butt Kicks)', duration: '30秒', sets: '3組', instruction: '站立，快速交替將腳跟踢向臀部，活躍大腿後側肌肉。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/35.MOV' },
    { id: 'c_e6', name: '左右滑步 (Side Steps)', duration: '30秒', sets: '3組', instruction: '微蹲，向左跨一步併腳，再向右跨一步併腳，保持核心收緊。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/36.MOV' },
    { id: 'c_e7', name: '站姿直拳 (Standing Punches)', duration: '30秒', sets: '3組', instruction: '站穩馬步，核心用力，雙手交替向前出拳。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/37.MOV' },
    { id: 'c_e8', name: '高抬腿 (High Knees)', duration: '20秒', sets: '3組', instruction: '原地快速跑動，盡量將膝蓋抬高至腰部高度。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/38.MOV' },
    { id: 'c_e9', name: '站姿划船 (Standing Row)', duration: '15次', sets: '3組', instruction: '雙腳踩住彈力帶，雙手拉向腰間。', equipment: 'band', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/39.MOV' },
    { id: 'c_e10', name: '模擬跳繩 (Shadow Jump Rope)', duration: '30秒', sets: '3組', instruction: '想像手持跳繩，手腕轉動，雙腳輕輕彈跳或墊腳尖。', equipment: 'bodyweight', type: 'exercise' }
  ],
  catStress: [
    { id: 's_s1', name: '站姿前彎 (Standing Forward Fold)', duration: '30秒', sets: '3組', instruction: '站立，膝蓋微彎，上半身放鬆向下垂，手抱手肘。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/41.MOV' },
    { id: 's_s2', name: '站姿脊椎扭轉 (Standing Twist)', duration: '20秒/邊', sets: '3組', instruction: '站立，骨盆不動，上半身向左轉，視線看向後方。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/42.MOV' },
    { id: 's_s3', name: '站姿貓牛式 (Standing Cat-Cow)', duration: '10次', sets: '3組', instruction: '手扶大腿，吐氣拱背低頭，吸氣挺胸抬頭。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/43.MOV' },
    { id: 's_s4', name: '側面頸部放鬆 (Ear to Shoulder)', duration: '15秒/邊', sets: '3組', instruction: '耳朵找肩膀，同側手輕扶頭部加壓，對側手下沉。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/44.MOV' },
    { id: 's_s5', name: '三頭肌伸展 (Triceps Stretch)', duration: '15秒/邊', sets: '3組', instruction: '手肘彎曲舉高，另一手輕壓手肘向後向下。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/45.MOV' },
    { id: 's_s6', name: '背部大擁抱 (Big Hug)', duration: '20秒', sets: '3組', instruction: '雙手交叉抱住自己肩膀，拱背，肩胛骨左右分開。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/46.mp4' },
    { id: 's_s7', name: '門框闊背肌 (Door Lat Stretch)', duration: '20秒/邊', sets: '3組', instruction: '手抓門框高處，臀部向後坐，拉伸腋下與側背。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/47.mp4' },
    { id: 's_s8', name: '手腕屈肌伸展 (Wrist Flexor)', duration: '15秒/邊', sets: '3組', instruction: '手臂伸直掌心向內，另一手輕壓手背。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/48.mp4' },
    { id: 's_s9', name: '相撲式蹲伸展 (Sumo Squat Stretch)', duration: '20秒', sets: '3組', instruction: '雙腳寬站，下蹲，雙手撐膝蓋內側，肩膀輪流下壓。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/49.mp4' },
    { id: 's_s10', name: '全身向上延伸 (Full Reach)', duration: '10秒', sets: '3組', instruction: '吸氣雙手十指交扣反掌向上推，墊腳尖，全身拉長。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/50.mp4' },
    { id: 's_e1', name: '全身甩動 (Body Shaking)', duration: '1分鐘', sets: '3組', instruction: '站立，全身放鬆，像果凍一樣抖動手腳和肩膀，釋放壓力。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/51.mp4' },
    { id: 's_e2', name: '站姿呼吸 (Standing Breath)', duration: '1分鐘', sets: '3組', instruction: '站立，雙手隨吸氣上舉，隨吐氣下壓，配合深呼吸。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/52.mp4' },
    { id: 's_e3', name: '轉體甩手 (Torso Twist Arm Swing)', duration: '30次', sets: '3組', instruction: '雙腳站寬，左右轉動軀幹，讓雙臂自然甩打身體兩側。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/53.mp4' },
    { id: 's_e4', name: '天地伸展 (Sky Reach)', duration: '20次', sets: '3組', instruction: '單手用力向天空抓取，左右交替，伸展側腹。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/54.mp4' },
    { id: 's_e5', name: '彈力帶過頂 (Pass-Throughs)', duration: '10次', sets: '3組', instruction: '站姿，握寬彈力帶，直臂前後繞過頭頂，靈活肩關節。', equipment: 'band', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/55.mp4' },
    { id: 's_e6', name: '聳肩落下 (Drop Shrugs)', duration: '10次', sets: '3組', instruction: '用力聳肩3秒，瞬間完全放鬆落下，吐氣有聲。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/56.mp4' },
    { id: 's_e7', name: '輕拍經絡 (Meridian Tapping)', duration: '1分鐘', sets: '3組', instruction: '用空拳輕輕拍打手臂外側、腿部外側和肩膀。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/57.mp4' },
    { id: 's_e8', name: '站姿畫圓 (Torso Circles)', duration: '10圈', sets: '3組', instruction: '雙手插腰，上半身大幅度畫圓，放鬆腰背。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/58.mp4' },
    { id: 's_e9', name: '握拳釋放 (Fist Clench)', duration: '5次', sets: '3組', instruction: '站立，全身用力繃緊(握拳/縮趾/皺眉)3秒，然後瞬間放鬆。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/59.mp4' },
    { id: 's_e10', name: '正念步行 (Mindful Walk)', duration: '1分鐘', sets: '3組', instruction: '在小空間極慢行走，專注腳底接觸地面的感覺。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/0ii5wykjb/60.mp4' }
  ],
  catCore: [
    { id: 'co_s1', name: '眼鏡蛇式 (Standing Cobra)', duration: '15秒', sets: '3組', instruction: '站姿雙手扶後腰，骨盆輕推前，胸口向天花板延展。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/61.mp4' },
    { id: 'co_s2', name: '站姿抱膝 (Standing Knee Hug)', duration: '20秒/邊', sets: '3組', instruction: '背靠牆站立，雙手抱住單腳膝蓋拉向胸口。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/62.mp4' },
    { id: 'co_s3', name: '側腰伸展 (Side Bend)', duration: '15秒/邊', sets: '3組', instruction: '站姿，雙手互握向上，身體向側邊彎曲。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/63.mp4' },
    { id: 'co_s4', name: '站姿翹腳伸展 (Standing Figure 4)', duration: '20秒/邊', sets: '3組', instruction: '手扶椅背，翹腳半蹲，伸展臀部與下背。', equipment: 'chair', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/64.mp4' },
    { id: 'co_s5', name: '腹部拉伸 (Ab Stretch)', duration: '15秒', sets: '3組', instruction: '雙手高舉過頭，墊腳尖，盡量將腹部線條拉長。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/NuBalancePro/65.mp4' },
    { id: 'co_s6', name: '站姿腰方肌伸展 (Standing QL)', duration: '20秒/邊', sets: '3組', instruction: '雙腳交叉站，後腳側的手舉高向對側彎曲。', equipment: 'bodyweight', type: 'stretch' },
    { id: 'co_s7', name: '骨盆時鐘 (Pelvic Tilts)', duration: '10次', sets: '3組', instruction: '站姿，膝蓋微彎，控制骨盆前傾與後傾，活動腰椎。', equipment: 'bodyweight', type: 'stretch' },
    { id: 'co_s8', name: '扶椅闊背肌延展 (Lat Stretch)', duration: '20秒/邊', sets: '3組', instruction: '雙手扶椅背，身體後退下壓，背部打平。', equipment: 'chair', type: 'stretch' },
    { id: 'co_s9', name: '大轉子伸展 (IT Band)', duration: '20秒/邊', sets: '3組', instruction: '站姿雙腳交叉，身體向後腳側彎曲。', equipment: 'bodyweight', type: 'stretch' },
    { id: 'co_s10', name: '髖部畫圓 (Hip Circles)', duration: '10圈', sets: '3組', instruction: '站姿雙手插腰，像搖呼拉圈一樣轉動骨盆。', equipment: 'bodyweight', type: 'stretch' },
    { id: 'co_e1', name: '站姿提膝觸肘 (Standing Knee to Elbow)', duration: '12次', sets: '3組', instruction: '站立，雙手抱頭，對側膝蓋與手肘相觸，擠壓側腹。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/71.MOV' },
    { id: 'co_e2', name: '抗旋推舉 (Pallof Press)', duration: '10次/邊', sets: '3組', instruction: '站姿，側對彈力帶固定點，雙手握帶推向正前方抗旋轉。', equipment: 'band', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/72.MOV' },
    { id: 'co_e3', name: '站姿早安式 (Good Mornings)', duration: '12次', sets: '3組', instruction: '雙手抱頭，保持背部打直，臀部向後推，上半身前傾。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/73.MOV' },
    { id: 'co_e4', name: '單腳站立平衡 (Single Leg Balance)', duration: '30秒/邊', sets: '3組', instruction: '單腳站立，另一腳離地，保持骨盆水平，核心收緊。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/74.MOV' },
    { id: 'co_e5', name: '站姿交叉爬行 (Cross Crawl)', duration: '20次', sets: '3組', instruction: '站立，右手拍左膝，左手拍右膝，交替進行，動作誇張。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/75.MOV' },
    { id: 'co_e6', name: '伐木動作 (Woodchoppers)', duration: '10次/邊', sets: '3組', instruction: '踩住彈力帶，雙手握帶由下往對側上方斜拉旋轉。', equipment: 'band', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/76.mp4?updatedAt=1771422639237' },
    { id: 'co_e7', name: '風車觸足 (Standing Windmill)', duration: '20次', sets: '3組', instruction: '雙腳寬站，雙手平舉，右手觸左腳尖，左手觸右腳尖。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/77.mp4?updatedAt=1771422640415' },
    { id: 'co_e8', name: '站姿後抬腿 (Standing Glute Kickback)', duration: '15次/邊', sets: '3組', instruction: '手扶牆，單腳向後上方抬起，收緊臀部，腰不塌。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/78.mp4?updatedAt=1771422640916' },
    { id: 'co_e9', name: '站姿鳥狗式 (Standing Bird Dog)', duration: '10次/邊', sets: '3組', instruction: '站立，對側手腳同時向前後延伸抬起，保持平衡。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/79.mp4?updatedAt=1771422640648' },
    { id: 'co_e10', name: '側向抬腿 (Side Leg Raise)', duration: '12次/邊', sets: '3組', instruction: '站立扶牆，單腿向外側抬起，身體不歪斜，訓練臀中肌。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/80.mp4?updatedAt=1771422640424' }
  ],
  catSleep: [
    { id: 'sl_s1', name: '椅上抬腿 (Legs on Chair)', duration: '3分鐘', sets: '1組', instruction: '躺地，小腿置於椅面，放鬆腰背，促進回流。', equipment: 'chair', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/81.mp4' },
    { id: 'sl_s2', name: '蝴蝶式 (Cobbler Pose)', duration: '2分鐘', sets: '1組', instruction: '坐姿腳掌相對，膝蓋自然打開，放鬆髖內側。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/82.mp4' },
    { id: 'sl_s3', name: '快樂嬰兒 (Happy Baby)', duration: '1分鐘', sets: '1組', instruction: '躺姿屈膝，手抓腳板外側，膝蓋找腋下，左右搖擺。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/83.mp4' },
    { id: 'sl_s4', name: '仰臥脊椎扭轉 (Supine Twist)', duration: '1分鐘/邊', sets: '1組', instruction: '躺姿，單腿屈膝跨過身體倒向對側，頭看反向。', equipment: 'bodyweight', type: 'stretch' },
    { id: 'sl_s5', name: '仰臥抱腿 (Wind Removing)', duration: '1分鐘', sets: '1組', instruction: '躺姿抱雙膝壓向腹部，輕輕左右滾動按摩背部。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/85.mp4' },
    { id: 'sl_s6', name: '大休息式 (Corpse Pose)', duration: '3分鐘', sets: '1組', instruction: '全身平躺，手腳自然攤開，完全放鬆每一寸肌肉。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/86.mp4' },
    { id: 'sl_s7', name: '頸部畫圓 (Neck Rolls)', duration: '1分鐘', sets: '1組', instruction: '極慢速度轉動頭部，尋找緊繃點停留呼吸。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/87.mp4' },
    { id: 'sl_s8', name: '腿後伸展躺姿 (Hamstring)', duration: '30秒/邊', sets: '1組', instruction: '躺姿，用毛巾或彈力帶勾住足底，將腿拉直向上。', equipment: 'band', type: 'stretch' },
    { id: 'sl_s9', name: '開胸魚式 (Supported Fish)', duration: '2分鐘', sets: '1組', instruction: '在背後肩胛骨處墊枕頭或瑜珈磚，躺下開胸。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/89.mp4' },
    { id: 'sl_s10', name: '手腳腕轉動 (Joint Freeing)', duration: '1分鐘', sets: '1組', instruction: '躺在床上，舉起手腳，緩慢轉動手腕腳踝。', equipment: 'bodyweight', type: 'stretch', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/90.mp4' },
    { id: 'sl_e1', name: '4-7-8 呼吸 (4-7-8 Breath)', duration: '4循環', sets: '1組', instruction: '吸氣4秒，憋氣7秒，嘴巴吐氣8秒，可站可臥。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/91.mp4' },
    { id: 'sl_e2', name: '站姿放鬆前彎 (Ragdoll)', duration: '1分鐘', sets: '1組', instruction: '站立膝蓋彎，身體前掛，互抱手肘，像布娃娃一樣左右輕晃。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/92.mp4' },
    { id: 'sl_e3', name: '輕柔搖擺 (Gentle Sway)', duration: '2分鐘', sets: '1組', instruction: '站立，雙腳寬於肩，輕輕左右轉動身體，手臂隨之擺動。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/93.mp4' },
    { id: 'sl_e4', name: '漸進放鬆 (PMR)', duration: '5分鐘', sets: '1組', instruction: '從腳趾到頭頂，依序用力緊繃肌肉5秒再放鬆。', equipment: 'bodyweight', type: 'exercise' },
    { id: 'sl_e5', name: '身體掃描 (Body Scan)', duration: '3分鐘', sets: '1組', instruction: '閉眼，意識掃過全身各部位，感受並放鬆。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/95.mp4' },
    { id: 'sl_e6', name: '月亮呼吸 (Left Nostril)', duration: '2分鐘', sets: '1組', instruction: '按住右鼻孔，只用左鼻孔緩慢呼吸，啟動副交感神經。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/96(1).mp4' },
    { id: 'sl_e7', name: '數息法 (Counting)', duration: '2分鐘', sets: '1組', instruction: '專注呼吸，吸氣數1，吐氣數2，數到10再重來。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/97.mp4' },
    { id: 'sl_e8', name: '腿部靠牆 (Legs Up Wall)', duration: '5分鐘', sets: '1組', instruction: '臀部貼牆，雙腳向上伸直靠牆，促進血液回流放鬆。', equipment: 'bodyweight', type: 'exercise' },
    { id: 'sl_e9', name: '下顎放鬆 (Jaw Release)', duration: '1分鐘', sets: '1組', instruction: '張大嘴巴發出「啊」聲，左右移動下巴，放鬆咬肌。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/99.mp4' },
    { id: 'sl_e10', name: '感恩回想 (Gratitude)', duration: '2分鐘', sets: '1組', instruction: '回想今天發生的3件好事，帶著正向情緒入睡。', equipment: 'bodyweight', type: 'exercise', demoVideoUrl: 'https://ik.imagekit.io/Nubalance/100.mp4' }
  ]
};

// --- Logo Component ---
const AppLogo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const dim = size === "lg" ? "w-20 h-20" : size === "md" ? "w-12 h-12" : "w-10 h-10";
  const iconSize = size === "lg" ? 36 : size === "md" ? 22 : 18;
  const radius = size === "lg" ? "rounded-[30%]" : "rounded-[25%]";

  return (
    <div className={`relative ${dim} flex items-center justify-center animate-logo-magnetic group`}>
      <div className="particle top-0 left-0" style={{ animationDelay: '0s' }}></div>
      <div className="particle bottom-2 right-0" style={{ animationDelay: '0.8s' }}></div>
      <div className="particle top-2 right-2" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-500 rounded-full animate-logo-glow-complex blur-xl"></div>
      <div className="absolute inset-1 rounded-full border border-white/30 animate-pulse"></div>
      <div className={`relative h-full w-full bg-slate-950/90 backdrop-blur-md ${radius} border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden`}>
        <div className="shimmer-layer"></div>
        <div className="animate-heartbeat flex items-center justify-center">
            <Zap className="text-white fill-white drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" size={iconSize} />
        </div>
      </div>
    </div>
  );
};

// --- ProgressBar Component ---
const ProgressBar = ({ label, current, target, unit }: ProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, (current / target) * 100));

  return (
    <div>
      <div className="flex justify-between items-end mb-1">
        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{label}</span>
        <span className="text-[10px] font-bold opacity-80">{Math.round(current)} / {Math.round(target)}{unit}</span>
      </div>
      <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
        <div 
          className="h-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-1000 ease-out rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// --- REAL RECIPE DATA (300 items) ---
const breakfastNames = [
    "牛奶燕麥粥", "雞蛋全麥三文治", "香蕉花生醬多士", "蒸紅薯配水煮蛋", "蔬菜雞肉粥",
    "希臘乳酪拌堅果", "火腿芝士蛋卷", "番茄通粉", "無糖豆漿配饅頭", "牛油果吐司",
    "藍莓燕麥碗", "肉碎湯米粉", "蒸玉米配牛奶", "吞拿魚沙律", "蔥花雞蛋餅",
    "南瓜小米粥", "全麥貝果配忌廉芝士", "蘑菇菠菜歐姆蛋", "蘋果肉桂麥片", "烚蛋配西蘭花",
    "奇亞籽布丁", "紫薯泥", "紅豆薏米粥", "糙米飯糰", "雞胸肉捲餅",
    "低脂牛奶玉米片", "鮮蝦雲吞湯", "菠菜蒸蛋", "烤南瓜片", "青瓜火腿治",
    "香煎豆腐", "黑芝麻糊", "紅棗桂圓茶配蛋", "雜果沙律", "全麥鬆餅",
    "番茄炒蛋配麵包", "清湯烏冬", "蒸燒賣(蝦仁)", "味噌湯配飯", "燕麥曲奇",
    "蛋白棒配水果", "豬肉白菜餃子", "生菜魚肉湯", "腐竹白果粥", "雜菌意粉",
    "雞肉凱撒沙律捲", "低糖綠豆沙", "蒸芋頭", "鮮奶燉蛋白", "芝麻醬拌麵",
    "肉鬆夾心吐司", "香蕉奶昔", "紅蘿蔔蛋糕(低糖)", "西柚蜂蜜茶配蛋", "麥皮蝦",
    "冬菇滑雞粥", "煙三文魚多士", "粟米肉粒飯(小碗)", "蒸蘿蔔糕", "烚菜心配蠔油",
    "酸奶水果杯", "核桃露", "皮蛋瘦肉粥", "雪耳燉梨", "烤雞翼配沙律",
    "煎餃子", "鮮蝦腸粉", "牛肉球", "叉燒包", "糯米雞",
    "魚片粥", "艇仔粥", "及第粥", "油條配豆漿(半份)", "鹹肉粽(半隻)",
    "銀絲卷", "馬拿糕", "潮州粉果", "鮮蝦餃", "小籠包",
    "煎堆(小)", "春卷", "咖哩魚蛋", "碗仔翅", "生菜魚肉",
    "豬骨粥", "柴魚花生粥", "白粥配油炸鬼", "豆沙包", "奶黃包",
    "蓮蓉包", "叉燒酥", "蛋撻", "菠蘿包(無牛油)", "雞尾包",
    "腸仔包", "吞拿魚包", "腿蛋治", "鮮牛治", "公司三文治"
];

const lunchNames = [
    "海南雞飯", "番茄蛋飯", "咖哩雞飯", "肉燥飯", "日式牛丼",
    "豬扒飯", "魚香茄子飯", "麻婆豆腐飯", "滑蛋蝦仁飯", "乾炒牛河",
    "星洲炒米", "雲吞麵", "牛腩麵", "魚蛋粉", "墨丸河",
    "炸醬麵", "上海粗麵", "擔擔麵", "水餃麵", "雞絲粉皮",
    "紅燒牛肉麵", "清湯腩河", "粟米班塊飯", "西芹雞柳飯", "菜遠排骨飯",
    "涼瓜牛肉飯", "芙蓉蛋飯", "鹹魚雞粒炒飯", "揚州炒飯", "福建炒飯",
    "豉椒排骨飯", "梅菜扣肉飯", "蔥油雞飯", "白切雞飯", "燒鴨飯",
    "油雞飯", "叉燒飯", "燒肉飯", "燻蹄飯", "五寶飯",
    "回鍋肉飯", "宮保雞丁飯", "酸甜排骨飯", "京都骨飯", "西檸雞飯",
    "菠蘿咕嚕肉飯", "椒鹽豬扒飯", "粟米肉粒飯", "窩蛋牛肉飯", "柱侯牛腩飯",
    "咖哩牛腩飯", "沙爹牛肉飯", "黑椒牛柳絲飯", "中式牛柳飯", "蒜香骨飯",
    "生炒骨飯", "枝竹火腩飯", "豆腐火腩飯", "粟米魚肚羹飯", "羅漢齋飯",
    "鮮茄牛肉飯", "鮮茄豬扒飯", "焗豬扒飯", "焗肉醬意粉", "焗海鮮飯",
    "白汁雞皇飯", "葡國雞飯", "黑椒雞扒飯", "蒜蓉雞扒飯", "香茅豬扒飯",
    "越式生牛肉河", "越式香茅雞肉檬", "泰式炒金邊粉", "泰式海南雞飯", "泰式豬手飯",
    "泰式綠咖哩雞飯", "泰式紅咖哩牛飯", "日式滑蛋雞肉飯", "日式叉燒拉麵", "日式豬骨拉麵",
    "日式味噌拉麵", "日式咖哩豬扒飯", "日式天婦羅飯", "韓式拌飯", "韓式泡菜炒飯",
    "韓式炒年糕", "韓式部隊鍋(一人)", "韓式人蔘雞湯飯", "台式滷肉飯", "台式雞肉飯",
    "台式牛肉麵", "台式排骨飯", "台式三杯雞飯", "台式鹽酥雞飯", "意式肉醬意粉",
    "卡邦尼意粉", "蒜香辣椒意粉", "青醬雞肉意粉", "海鮮蕃茄意粉"
];

const dinnerNames = [
    "清蒸鯇魚", "番茄炒蛋", "土豆燉牛肉", "蒜蓉炒菜心", "香煎雞翼",
    "蒸水蛋", "冬瓜粒湯", "粟米紅蘿蔔湯", "老黃瓜湯", "西洋菜湯",
    "青紅蘿蔔豬骨湯", "蓮藕章魚湯", "粉葛鯪魚湯", "花旗參雞湯", "蟲草花蒸雞",
    "冬菇蒸雞", "雲耳蒸雞", "南乳蒸排骨", "豉汁蒸排骨", "梅菜蒸肉餅",
    "鹹蛋蒸肉餅", "土魷蒸肉餅", "香煎芙蓉蛋", "蝦仁炒蛋", "苦瓜炒蛋",
    "節瓜粉絲蝦米煲", "魚香茄子煲", "豆腐火腩煲", "枝竹羊腩煲", "蘿蔔牛腩煲",
    "西蘭花炒帶子", "西芹炒魷魚", "荷蘭豆炒臘味", "蒜蓉蒸蝦", "白灼蝦",
    "豉油皇蝦", "薑蔥炒蟹", "清蒸石斑", "清蒸多寶魚", "紅燒魚",
    "糖醋魚塊", "粟米斑塊", "椒鹽鮮魷", "酥炸生蠔", "薑蔥生蠔",
    "西檸軟雞", "檸檬雞翼", "瑞士雞翼", "滷水雞翼", "滷水雞髀",
    "滷水鵝片", "滷水墨魚", "紅腸墨魚", "生炒排骨", "京都肉排",
    "椒鹽排骨", "鎮江骨", "蜜椒骨", "咕嚕肉", "賽螃蟹",
    "大良炒鮮奶", "滑蛋牛肉", "菜遠炒牛肉", "西芹炒雞柳", "腰果雞丁",
    "宮保雞丁", "辣子雞", "口水雞", "霸王雞", "鹽焗雞",
    "蔥油雞", "手撕雞", "醉雞", "麻油雞", "三杯雞",
    "螞蟻上樹", "魚香肉絲", "回鍋肉", "水煮牛肉", "水煮魚",
    "酸菜魚", "乾煸四季豆", "虎皮尖椒", "蒜泥白肉", "紅油抄手",
    "清炒時蔬", "上湯浸豆苗", "金銀蛋菠菜", "蒜蓉西蘭花", "蠔油生菜",
    "腐乳通菜", "蝦醬通菜", "清炒菜心", "清炒芥蘭", "薑汁炒芥蘭",
    "蒜蓉蒸絲瓜", "老少平安", "蒸釀豆腐", "煎釀三寶", "琵琶豆腐"
];

// Helper to generate detailed recipe data
const getRecipeDetails = (name: string, category: string) => {
  let ingredients = "";
  let method = [];

  if (category === 'breakfast') {
    ingredients = `• 主食 (${name.split('配')[0] || name.substring(0,2)}): 1份 (約150g)\n• 雞蛋 (Egg): 1隻\n• 牛奶/豆漿: 200ml\n• 新鮮水果: 1份 (約80g)`;
    method = [
      "1. 將食材洗淨，準備好烹飪用具。",
      `2. 根據個人口味烹調${name}，注意火候。`,
      "3. 搭配一杯熱牛奶或豆漿。",
      "4. 最後切好水果擺盤，享受營養早餐。"
    ];
  } else {
    // Lunch/Dinner
    if (name.includes('飯')) {
      ingredients = `• 白飯/糙米飯: 1碗 (約180g)\n• 主菜 (${name.replace('飯','') || '肉類'}): 150g\n• 時令蔬菜 (菜心/西蘭花): 100g\n• 植物油: 1茶匙\n• 薑蔥蒜: 適量`;
      method = [
        "1. 洗淨米放入電飯煲煮熟。",
        `2. 將${name.replace('飯','')}切件，蔬菜洗淨瀝乾。`,
        "3. 熱鍋下油，先炒熟主菜，再加入蔬菜快炒。",
        "4. 加入少許鹽或醬油調味，盛起鋪在飯面上。"
      ];
    } else if (name.includes('麵') || name.includes('粉') || name.includes('意粉')) {
      ingredients = `• 麵條/意粉: 1束 (約100g乾重)\n• 配料 (${name.replace(/[麵粉]|意粉/g,'') || '肉絲'}): 100g\n• 高湯/醬汁: 200ml\n• 青菜: 50g`;
      method = [
        "1. 燒一鍋水，水滾後放入麵條煮至彈牙。",
        "2. 另起鍋處理配料，煮熟或炒香。",
        "3. 加入高湯或醬汁煮滾，放入麵條吸收湯汁。",
        "4. 加入青菜燙熟，即可上碗享用。"
      ];
    } else {
      // General Dish (usually dinner dishes)
      ingredients = `• 主要食材 (${name}): 200g\n• 配料 (蔥/薑/蒜): 適量\n• 調味料 (鹽/糖/生抽): 適量\n• 食用油: 1湯匙`;
      method = [
        `1. 將${name}的主料處理乾淨，切成適口大小。`,
        "2. 準備佐料（薑片、蔥段等）。",
        "3. 熱鍋下油，爆香佐料，放入主料烹煮（蒸/炒/煮）。",
        "4. 確認食材完全熟透，調味後即可上碟。"
      ];
    }
  }
  return { ingredients, method };
};

const ALL_RECIPES: Recipe[] = [
    // Breakfast items (100)
    ...breakfastNames.map((name, i) => {
      const details = getRecipeDetails(name, 'breakfast');
      return {
        id: `br-${i}`, name, category: 'breakfast' as const, emoji: '🥣', 
        calories: 250 + (i % 5)*20, protein: 10 + (i%5), carbs: 30 + (i%5), fat: 5 + (i%3),
        saturatedFat: parseFloat((1 + (i % 2) * 0.5).toFixed(1)),
        transFat: 0,
        sodium: 200 + (i % 10) * 10,
        sugar: 5 + (i % 5),
        ingredients: details.ingredients, method: details.method
      };
    }),
    // Lunch items (100)
    ...lunchNames.map((name, i) => {
      const details = getRecipeDetails(name, 'lunch');
      return {
        id: `lu-${i}`, name, category: 'lunch' as const, emoji: '🍛', 
        calories: 500 + (i % 10)*10, protein: 20 + (i%5)*2, carbs: 60 + (i%5)*2, fat: 15 + (i%5),
        saturatedFat: parseFloat((3 + (i % 3) * 0.5).toFixed(1)),
        transFat: parseFloat((0.1 * (i % 2)).toFixed(1)),
        sodium: 600 + (i % 10) * 20,
        sugar: 3 + (i % 3),
        ingredients: details.ingredients, method: details.method
      };
    }),
    // Dinner items (100)
    ...dinnerNames.map((name, i) => {
      const details = getRecipeDetails(name, 'dinner');
      return {
        id: `di-${i}`, name, category: 'dinner' as const, emoji: '🍲', 
        calories: 450 + (i % 8)*10, protein: 25 + (i%5)*2, carbs: 40 + (i%5), fat: 12 + (i%4),
        saturatedFat: parseFloat((2 + (i % 3) * 0.5).toFixed(1)),
        transFat: 0,
        sodium: 500 + (i % 10) * 15,
        sugar: 2 + (i % 3),
        ingredients: details.ingredients, method: details.method
      };
    })
];

const FOOD_DATABASE: FoodDatabaseItem[] = [
  { id: 'v1', name: '西蘭花', category: '蔬菜', emoji: '🥦', calories: 35, protein: 2.8, carbs: 7, fat: 0.4, ingredients: '西蘭花', method: ['水煮', '炒'] },
  { id: 'f1', name: '蘋果', category: '水果', emoji: '🍎', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, ingredients: '蘋果', method: ['直接食用'] },
  ...Array.from({ length: 20 }).map((_, i) => ({ id: `gen-${i}`, name: `食物 ${i}`, category: '即食食物', emoji: '🍱', calories: 300, protein: 10, carbs: 40, fat: 10, ingredients: '一般食材', method: ['即食'] }))
];

// --- NUVISION DATA GENERATION ---
const generateNuVisionItems = () => {
  const GRAIN_NAMES = [
    "白米 (White Rice)", "糙米 (Brown Rice)", "紅米 (Red Rice)", "黑米 (Black Rice)", "糯米 (Glutinous Rice)",
    "珍珠米 (Pearl Rice)", "絲苗米 (Jasmine Rice)", "油粘米 (Oil Rice)", "壽司米 (Sushi Rice)", "五穀米 (Five Grain Rice)",
    "十穀米 (Ten Grain Rice)", "燕麥 (Oats)", "即食燕麥 (Instant Oats)", "麥皮 (Oatmeal)", "藜麥 (Quinoa)",
    "小米 (Millet)", "大麥 (Barley)", "小麥 (Wheat)", "蕎麥 (Buckwheat)", "薏米 (Job's Tears)",
    "全麥麵包 (Whole Wheat Bread)", "白麵包 (White Bread)", "方包 (Sliced Bread)", "麥包 (Wheat Bun)", "提子包 (Raisin Bun)",
    "菠蘿包 (Pineapple Bun)", "雞尾包 (Cocktail Bun)", "腸仔包 (Sausage Bun)", "吞拿魚包 (Tuna Bun)", "叉燒包 (BBQ Pork Bun)",
    "法包 (Baguette)", "牛角包 (Croissant)", "貝果 (Bagel)", "英式鬆餅 (English Muffin)", "米粉 (Rice Vermicelli)",
    "河粉 (Flat Rice Noodles)", "通粉 (Macaroni)", "意粉 (Spaghetti)", "烏冬 (Udon)", "拉麵 (Ramen)",
    "公仔麵 (Instant Noodles)", "米線 (Mixian)", "粉絲 (Glass Noodles)", "饅頭 (Steamed Bun)", "餃子 (Dumpling)",
    "雲吞 (Wonton)", "燒賣 (Siu Mai)", "糯米雞 (Sticky Rice Chicken)", "薯仔 (Potato)", "番薯 (Sweet Potato)"
  ];

  const MEAT_NAMES = [
    "瘦肉 (Lean Pork)", "五花肉 (Pork Belly)", "排骨 (Pork Ribs)", "豬扒 (Pork Chop)", "豬頸肉 (Pork Neck)",
    "豬手 (Pork Knuckle)", "豬肉碎 (Minced Pork)", "叉燒 (Char Siu)", "燒肉 (Roasted Pork)", "牛肉 (Beef)",
    "牛排 (Steak)", "牛柳 (Beef Tenderloin)", "西冷 (Sirloin)", "肉眼 (Ribeye)", "牛腩 (Beef Brisket)",
    "牛展 (Beef Shank)", "肥牛 (Fatty Beef)", "免治牛肉 (Minced Beef)", "雞肉 (Chicken)", "雞胸 (Chicken Breast)",
    "雞髀 (Chicken Thigh)", "雞翼 (Chicken Wing)", "雞柳 (Chicken Fillet)", "雞腳 (Chicken Feet)", "鴨肉 (Duck)",
    "燒鴨 (Roasted Duck)", "羊肉 (Lamb)", "羊架 (Lamb Rack)", "三文魚 (Salmon)", "吞拿魚 (Tuna)",
    "鱈魚 (Cod)", "比目魚 (Halibut)", "石斑 (Grouper)", "鱸魚 (Sea Bass)", "鯖魚 (Mackerel)",
    "鰻魚 (Eel)", "魚柳 (Fish Fillet)", "魚蛋 (Fish Ball)", "鯇魚 (Grass Carp)", "蝦 (Shrimp)",
    "蝦仁 (Shrimp Meat)", "蟹 (Crab)", "帶子 (Scallop)", "生蠔 (Oyster)", "蜆 (Clam)",
    "魷魚 (Squid)", "雞蛋 (Egg)", "鹹蛋 (Salted Egg)", "皮蛋 (Century Egg)", "豆腐 (Tofu)"
  ];

  const FRUIT_NAMES = [
    "蘋果 (Apple)", "青蘋果 (Green Apple)", "紅蘋果 (Red Apple)", "香蕉 (Banana)", "橙 (Orange)",
    "柑 (Mandarin)", "柚子 (Pomelo)", "西柚 (Grapefruit)", "檸檬 (Lemon)", "青檸 (Lime)",
    "提子 (Grape)", "青提 (Green Grape)", "紅提 (Red Grape)", "黑提 (Black Grape)", "士多啤梨 (Strawberry)",
    "藍莓 (Blueberry)", "車厘子 (Cherry)", "西瓜 (Watermelon)", "哈密瓜 (Cantaloupe)", "蜜瓜 (Honeydew)",
    "木瓜 (Papaya)", "芒果 (Mango)", "菠蘿 (Pineapple)", "椰子 (Coconut)", "牛油果 (Avocado)",
    "奇異果 (Kiwi)", "金奇異果 (Gold Kiwi)", "火龍果 (Dragon Fruit)", "百香果 (Passion Fruit)", "石榴 (Pomegranate)",
    "番石榴 (Guava)", "楊桃 (Star Fruit)", "柿子 (Persimmon)", "桃 (Peach)", "水蜜桃 (Juicy Peach)",
    "李子 (Plum)", "梨 (Pear)", "雪梨 (Snow Pear)", "荔枝 (Lychee)", "龍眼 (Longan)",
    "山竹 (Mangosteen)", "榴槤 (Durian)", "無花果 (Fig)", "提子乾 (Raisin)", "杏脯 (Dried Apricot)",
    "蔓越莓乾 (Dried Cranberry)", "藍莓乾 (Dried Blueberry)", "椰棗 (Date Palm)", "紅棗 (Red Date)", "杞子 (Goji Berry)"
  ];

  const VEGGIE_NAMES = [
    "菜心 (Choi Sum)", "芥蘭 (Gai Lan)", "白菜 (Bok Choy)", "小棠菜 (Shanghai Bok Choy)", "娃娃菜 (Baby Cabbage)",
    "紹菜 (Napa Cabbage)", "椰菜 (Cabbage)", "生菜 (Lettuce)", "西生菜 (Iceberg Lettuce)", "菠菜 (Spinach)",
    "通菜 (Water Spinach)", "番薯葉 (Sweet Potato Leaves)", "莧菜 (Amaranth)", "西洋菜 (Watercress)", "豆苗 (Pea Shoots)",
    "西蘭花 (Broccoli)", "椰菜花 (Cauliflower)", "西芹 (Celery)", "芫荽 (Coriander)", "蔥 (Scallion)",
    "洋蔥 (Onion)", "紫洋蔥 (Red Onion)", "蒜頭 (Garlic)", "薑 (Ginger)", "紅蘿蔔 (Carrot)",
    "白蘿蔔 (Radish)", "蓮藕 (Lotus Root)", "馬蹄 (Water Chestnut)", "粟米 (Corn)", "粟米仔 (Baby Corn)",
    "番茄 (Tomato)", "車厘茄 (Cherry Tomato)", "茄子 (Eggplant)", "青瓜 (Cucumber)", "節瓜 (Hairy Gourd)",
    "冬瓜 (Winter Melon)", "南瓜 (Pumpkin)", "翠玉瓜 (Zucchini)", "苦瓜 (Bitter Melon)", "絲瓜 (Luffa)",
    "四季豆 (Green Bean)", "荷蘭豆 (Snow Pea)", "蜜糖豆 (Snap Pea)", "芽菜 (Bean Sprout)", "蘑菇 (Mushroom)",
    "冬菇 (Shiitake)", "金菇 (Enoki)", "雲耳 (Black Fungus)", "秋葵 (Okra)", "燈籠椒 (Bell Pepper)"
  ];

  const generate = (names: string[], prefix: string, minPrice: number, maxPrice: number) => {
    return names.map((name, i) => ({
      id: `${prefix}${i + 1}`,
      name: name,
      price: Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice,
      emoji: "" // Removed emoji as requested
    }));
  };

  return {
    grains: generate(GRAIN_NAMES, 'g', 3, 12),
    meat: generate(MEAT_NAMES, 'm', 12, 32),
    fruits: generate(FRUIT_NAMES, 'f', 2, 10),
    veggies: generate(VEGGIE_NAMES, 'v', 4, 14)
  };
};

const NUVISION_ITEMS = generateNuVisionItems();

export default function App() {
 const [lang, setLang] = useState<'zh' | 'en'>('zh');
 const t = translations[lang];
 
 const [currentPage, setCurrentPage] = useState('setup');
 const [isProfileExpanded, setIsProfileExpanded] = useState(true); // Default open
 const [isActivityExpanded, setIsActivityExpanded] = useState(true); // New state for foldable activity section
 
 const [profiles, setProfiles] = useState<UserProfile[]>(() => {
   const saved = localStorage.getItem('nubalance_profiles');
   const initial = saved ? JSON.parse(saved) : [{
     id: 'user-1',
     name: '我 (My Profile)',
     height: '172',
     weight: '68',
     age: '30',
     gender: 'male',
     activity: 'sedentary',
     logs: [],
     waterIntake: 0,
     avatarColor: 'bg-indigo-500'
   }];
   return initial.map((p: any) => ({ ...p, logs: p.logs || [] }));
 });
 const [activeProfileId, setActiveProfileId] = useState<string>(() => {
    return localStorage.getItem('nubalance_active_id') || 'user-1';
 });
 const [showProfileSwitcher, setShowProfileSwitcher] = useState(false);
 const [showHistoryModal, setShowHistoryModal] = useState(false);
 const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);

 useEffect(() => { localStorage.setItem('nubalance_profiles', JSON.stringify(profiles)); }, [profiles]);
 useEffect(() => { localStorage.setItem('nubalance_active_id', activeProfileId); }, [activeProfileId]);
 useEffect(() => { setIsDeleteConfirming(false); }, [activeProfileId]);

 const currentProfile = useMemo(() => profiles.find(p => p.id === activeProfileId) || profiles[0], [profiles, activeProfileId]);

 const dailyConsumed = useMemo(() => {
   return currentProfile.logs.reduce((acc, log) => ({
     calories: acc.calories + log.calories,
     protein: acc.protein + log.protein,
     carbs: acc.carbs + log.carbs,
     fat: acc.fat + log.fat
   }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
 }, [currentProfile.logs]);

 const updateCurrentProfile = (field: keyof UserProfile, value: any) => {
   setProfiles(prev => prev.map(p => p.id === activeProfileId ? { ...p, [field]: value } : p));
 };

 const addLogEntry = (entry: Omit<LogEntry, 'id' | 'time'>) => {
   const newLog: LogEntry = { ...entry, id: `log-${Date.now()}`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
   setProfiles(prev => prev.map(p => p.id === activeProfileId ? { ...p, logs: [newLog, ...p.logs] } : p));
 };

 const removeLogEntry = (logId: string) => {
   setProfiles(prev => prev.map(p => p.id === activeProfileId ? { ...p, logs: p.logs.filter(l => l.id !== logId) } : p));
 };

 const updateCurrentProfileWater = (newWater: number) => {
   setProfiles(prev => prev.map(p => p.id === activeProfileId ? { ...p, waterIntake: newWater } : p));
 };

 const createNewProfile = () => {
   const newId = `user-${Date.now()}`;
   const colors = ['bg-rose-500', 'bg-emerald-500', 'bg-amber-500', 'bg-cyan-500', 'bg-violet-500'];
   const newProfile: UserProfile = {
     id: newId, name: lang === 'zh' ? '新成員' : 'New Member', height: '160', weight: '60', age: '60', gender: 'female', activity: 'sedentary', logs: [], waterIntake: 0, avatarColor: colors[profiles.length % colors.length]
   };
   setProfiles([...profiles, newProfile]);
   setActiveProfileId(newId);
   setIsProfileExpanded(true); // Ensure new profile is expanded
 };

 const deleteProfile = (id: string) => {
   if (profiles.length <= 1) return;
   const newProfiles = profiles.filter(p => p.id !== id);
   setProfiles(newProfiles);
   if (activeProfileId === id) { setActiveProfileId(newProfiles[0].id); }
   setIsDeleteConfirming(false);
 };

 const [isAiSearching, setIsAiSearching] = useState(false);
 const [searchQuery, setSearchQuery] = useState('');
 const [refinementDetails, setRefinementDetails] = useState('');
 const [refinementPrompt, setRefinementPrompt] = useState<string | null>(null);
 const [showWaterMenu, setShowWaterMenu] = useState(false);
 const [customWaterVal, setCustomWaterVal] = useState('');
 
 const [showChatOverlay, setShowChatOverlay] = useState(false);
 const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
 const [chatInput, setChatInput] = useState('');
 const [isChatLoading, setIsChatLoading] = useState(false);
 const chatEndRef = useRef<HTMLDivElement>(null);

 const [showAiModal, setShowAiModal] = useState(false);
 const [showSearchOverlay, setShowSearchOverlay] = useState(false); 
 const [activeCategory, setActiveCategory] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
 const [aiBatchIndices, setAiBatchIndices] = useState<Record<string, number>>({ breakfast: 0, lunch: 0, dinner: 0 });
 const [selectedDish, setSelectedDish] = useState<Recipe | null>(null);

 const [browsingCategory, setBrowsingCategory] = useState<any | null>(null);
 const [dbSearchQuery, setDbSearchQuery] = useState('');
 const [selectedSubgroup, setSelectedSubgroup] = useState<string | null>(null);

 const [aiSearchResult, setAiSearchResult] = useState<AiSearchResult | null>(null);
 const [selectedPortion, setSelectedPortion] = useState<AiPortion | null>(null);
 const [customGramAmount, setCustomGramAmount] = useState<string>('100');
 
 const [showActionMenu, setShowActionMenu] = useState(false);
 const [showShapeStretch, setShowShapeStretch] = useState(false);
 const [selectedShapeCategory, setSelectedShapeCategory] = useState<string | null>(null);
 const [shapeStretchTab, setShapeStretchTab] = useState<'all' | 'stretch' | 'exercise'>('all');

 // --- NuVision State ---
 const [showNuVisionModal, setShowNuVisionModal] = useState(false);
 const [nuVisionImage, setNuVisionImage] = useState<string | null>(null);
 const [isNuVisionAnalyzing, setIsNuVisionAnalyzing] = useState(false);
 const [nuVisionResult, setNuVisionResult] = useState<any | null>(null);
 const [nuVisionCart, setNuVisionCart] = useState<string[]>([]);
 const [nuVisionCategory, setNuVisionCategory] = useState('all');
 const NUVISION_BUDGET = 50;

  // --- NuVision Handlers ---
  const getItemName = (fullName: string) => {
    if (lang === 'en') {
      const match = fullName.match(/\(([^)]+)\)/);
      return match ? match[1] : fullName;
    } else {
      return fullName.split(' (')[0];
    }
  };

  const toggleNuVisionItem = (itemId: string) => {
    setNuVisionCart(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        if (prev.length >= 4) {
          alert(t.maxItems);
          return prev;
        }
        // Check budget
        const currentTotal = prev.reduce((sum, id) => {
          const item = Object.values(NUVISION_ITEMS).flat().find(i => i.id === id);
          return sum + (item?.price || 0);
        }, 0);
        const newItem = Object.values(NUVISION_ITEMS).flat().find(i => i.id === itemId);
        if (currentTotal + (newItem?.price || 0) > NUVISION_BUDGET) {
          alert(t.overBudget);
          return prev;
        }
        return [...prev, itemId];
      }
    });
  };
 
  const handleNuVisionAnalyze = async () => {
    if (nuVisionCart.length === 0) return;
    setIsNuVisionAnalyzing(true);
    try {
      const selectedItems = nuVisionCart.map(id => {
        const item = Object.values(NUVISION_ITEMS).flat().find(i => i.id === id);
        return item ? `${getItemName(item.name)} ($${item.price})` : '';
      }).join(', ');

      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'nuvision-analyze', selectedItems, lang })
      });
      
      if (!response.ok) throw new Error('Analysis failed');
      const data = await response.json();
      setNuVisionResult(data);
    } catch (e) {
      console.error(e);
      alert(t.analysisFailed);
    } finally {
      setIsNuVisionAnalyzing(false);
    }
  };

 const activityOptions = [
 { id: 'sedentary', label: lang === 'zh' ? '久坐（幾乎不運動）' : 'Sedentary', factor: 1.2 },
 { id: 'light', label: lang === 'zh' ? '輕度（每週運動 1-3 天）' : 'Lightly Active', factor: 1.375 },
 { id: 'moderate', label: lang === 'zh' ? '中度（每週運動 3-5 天）' : 'Moderately Active', factor: 1.55 },
 { id: 'heavy', label: lang === 'zh' ? '高度（每週運動 6-7 天）' : 'Very Active', factor: 1.725 },
 ];

 const nutritionTargets = useMemo(() => {
 const h = parseFloat(currentProfile.height) || 0;
 const w = parseFloat(currentProfile.weight) || 0;
 const a = parseFloat(currentProfile.age) || 0;
 if (!h || !w || !a) return { calories: 2000, protein: 100, carbs: 250, fat: 60, bmi: '0.0' };
 let bmr = (10 * w) + (6.25 * h) - (5 * a);
 bmr = currentProfile.gender === 'male' ? bmr + 5 : bmr - 161;
 const factor = activityOptions.find(o => o.id === currentProfile.activity)?.factor || 1.2;
 const tdee = bmr * factor;
 return {
 calories: Math.round(tdee),
 protein: (tdee * 0.25) / 4,
 carbs: (tdee * 0.45) / 4,
 fat: (tdee * 0.30) / 9,
 bmi: (w / ((h / 100) ** 2)).toFixed(1)
 };
 }, [currentProfile, lang]);

 useEffect(() => { if (showChatOverlay) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages, showChatOverlay]);

 const handleInputChange = (field: keyof UserProfile, value: string) => { updateCurrentProfile(field, value); };

 const addWater = (amount: string | number) => {
   const vol = typeof amount === 'string' ? parseInt(amount) : amount;
   if (!isNaN(vol) && vol > 0) {
     updateCurrentProfileWater(currentProfile.waterIntake + vol);
     setCustomWaterVal('');
     setShowWaterMenu(false);
   }
 };

 const handleAddDish = (dish: Recipe) => {
  addLogEntry({ name: dish.name, emoji: dish.emoji, calories: dish.calories, protein: dish.protein, carbs: dish.carbs, fat: dish.fat });
  setSelectedDish(null);
  setShowAiModal(false);
 };

 const handleAddDbItem = (item: FoodDatabaseItem) => {
   addLogEntry({ name: item.name, emoji: item.emoji, calories: item.calories, protein: item.protein, carbs: item.carbs, fat: item.fat });
   setBrowsingCategory(null);
   setDbSearchQuery('');
   setSelectedSubgroup(null);
 };

 const currentAiNutrition = useMemo(() => {
   if (!selectedPortion) return null;
   if (selectedPortion.isCustomBase) {
     const grams = parseFloat(customGramAmount) || 0;
     const ratio = grams / 100;
     return {
       calories: Math.round(selectedPortion.calories * ratio),
       protein: parseFloat((selectedPortion.protein * ratio).toFixed(1)),
       carbs: parseFloat((selectedPortion.carbs * ratio).toFixed(1)),
       fat: parseFloat((selectedPortion.fat * ratio).toFixed(1)),
       saturatedFat: parseFloat(((selectedPortion.saturatedFat || 0) * ratio).toFixed(1)),
       transFat: parseFloat(((selectedPortion.transFat || 0) * ratio).toFixed(1)),
       sodium: Math.round((selectedPortion.sodium || 0) * ratio),
       sugar: parseFloat(((selectedPortion.sugar || 0) * ratio).toFixed(1))
     };
   }
   return {
       ...selectedPortion,
       saturatedFat: selectedPortion.saturatedFat || 0,
       transFat: selectedPortion.transFat || 0,
       sodium: selectedPortion.sodium || 0,
       sugar: selectedPortion.sugar || 0
   };
 }, [selectedPortion, customGramAmount]);

 const handleAddAiResult = () => {
   const nut = currentAiNutrition;
   if (!nut) return;
   addLogEntry({ name: aiSearchResult?.name || "AI Food", emoji: aiSearchResult?.emoji || "🍽️", calories: nut.calories, protein: nut.protein, carbs: nut.carbs, fat: nut.fat });
   setAiSearchResult(null);
   setSelectedPortion(null);
   setSearchQuery('');
   setRefinementDetails('');
   setRefinementPrompt(null);
   setCustomGramAmount('100');
 };

 const handleAiSearch = async () => {
   if (!searchQuery.trim()) return;
   setIsAiSearching(true);
   try {
      const fullQuery = refinementPrompt ? `${searchQuery} (補充細節: ${refinementDetails})` : searchQuery;
      const responseF = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'search', query: fullQuery })
      });
      if (!responseF.ok) throw new Error('Search failed');
      const data = await responseF.json();

      if (data.needsMoreInfo) {
        setRefinementPrompt(data.promptMessage || "請提供更多關於份量或口感的細節。");
      } else {
        setAiSearchResult(data);
        const defaultPortion = data.portions?.find(p => !p.isCustomBase) || data.portions?.[0] || null;
        setSelectedPortion(defaultPortion);
        setShowSearchOverlay(false);
        setRefinementPrompt(null);
      }
    } catch (error) { console.error("AI Search Error:", error); } finally { setIsAiSearching(false); }
 };

 const handleSendChatMessage = async () => {
   if (!chatInput.trim() || isChatLoading) return;
   const userMsg: ChatMessage = { role: 'user', text: chatInput };
   
   // Add user message immediately
   setChatMessages(prev => [...prev, userMsg]);
   setChatInput('');
   setIsChatLoading(true);

   // Add placeholder for model response
   setChatMessages(prev => [...prev, { role: 'model', text: '' }]);

   try {
      const userContext = `
        User Profile:
        - Name: ${currentProfile.name}
        - Height: ${currentProfile.height}cm
        - Weight: ${currentProfile.weight}kg
        - Age: ${currentProfile.age}
        - Gender: ${currentProfile.gender}
        - Activity Level: ${currentProfile.activity}
        - Calculated Daily Target: ${nutritionTargets.calories} kcal
        - Protein Target: ${Math.round(nutritionTargets.protein)}g
        - BMI: ${nutritionTargets.bmi} (${parseFloat(nutritionTargets.bmi) < 18.5 ? 'Underweight' : parseFloat(nutritionTargets.bmi) < 24 ? 'Normal' : 'Overweight'})
      `;

      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'chat',
          message: userMsg.text, 
          context: userContext,
          history: chatMessages.map(m => ({ role: m.role, parts: [{ text: m.text }] }))
        })
      });

      if (!response.ok) throw new Error('Chat failed');
      const data = await response.json();
      const fullText = data.text;
      
      setChatMessages(prev => {
        const newHistory = [...prev];
        if (newHistory.length > 0) {
          newHistory[newHistory.length - 1] = { role: 'model', text: fullText };
        }
        return newHistory;
      });
    } catch (error) {
      console.error("Chat Error:", error);
      setChatMessages(prev => {
        const newHistory = [...prev];
        if (newHistory.length > 0) {
          newHistory[newHistory.length - 1] = { role: 'model', text: "連線失敗，請檢查網絡或稍後再試。\n(Connection failed. Please try again later.)" };
        }
        return newHistory;
      });
    } finally {
      setIsChatLoading(false);
    }
 };

 const currentCategoryRecipes = useMemo(() => {
   const filtered = ALL_RECIPES.filter(r => r.category === activeCategory);
   const startIndex = (aiBatchIndices[activeCategory] * 10) % filtered.length;
   return filtered.slice(startIndex, startIndex + 10);
 }, [activeCategory, aiBatchIndices]);

 const refreshBatch = () => {
   setAiBatchIndices(prev => {
     const nextIdx = (prev[activeCategory] + 1) % 10;
     return { ...prev, [activeCategory]: nextIdx };
   });
 };

 const filteredExercises = useMemo(() => {
    if (!selectedShapeCategory) return [];
    const all = SHAPE_STRETCH_CONTENT[selectedShapeCategory] || [];
    if (shapeStretchTab === 'all') return all;
    return all.filter(e => e.type === shapeStretchTab);
 }, [selectedShapeCategory, shapeStretchTab]);

 const filteredDbItems = useMemo(() => {
   if (!browsingCategory) return [];
   let items = FOOD_DATABASE.filter(i => i.category === browsingCategory.name);
   if (selectedSubgroup) { items = items.filter(i => i.subgroup === selectedSubgroup); }
   if (dbSearchQuery.trim()) { items = items.filter(i => i.name.toLowerCase().includes(dbSearchQuery.toLowerCase())); }
   return items;
 }, [browsingCategory, selectedSubgroup, dbSearchQuery]);

 return (
 <div className="fixed inset-0 w-full h-[100dvh] bg-slate-100 flex justify-center items-center font-sans text-slate-900">
  <div className="w-full max-w-md h-full bg-[#F8FAFC] relative flex flex-col shadow-2xl overflow-hidden">
  
  {/* Sticky Header */}
  <div className="bg-white/90 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-slate-100 z-[100] sticky top-0">
    <div className="flex items-center gap-3">
      <AppLogo size="md" />
      <div>
        <h1 className="font-black text-xl text-slate-800 tracking-tight leading-none">NuBalance Pro</h1>
        {currentPage === 'dashboard' && (
          <div className="relative mt-1">
            <button onClick={() => setShowProfileSwitcher(!showProfileSwitcher)} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 pl-1.5 pr-2.5 py-1 rounded-full transition-all">
              <div className={`w-4 h-4 rounded-full ${currentProfile.avatarColor} text-[8px] text-white flex items-center justify-center font-black`}>{currentProfile.name.charAt(0)}</div>
              <span className="text-[10px] font-bold text-slate-600 max-w-[80px] truncate">{currentProfile.name}</span>
              <ChevronDown size={10} className="text-slate-400" />
            </button>
            {/* 快速切換下拉選單 */}
            {showProfileSwitcher && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 animate-in fade-in slide-in-from-top-2 z-[60]">
                <div className="text-[10px] font-black text-slate-300 uppercase px-2 py-1 tracking-widest">{t.switchProfile}</div>
                {profiles.map(p => (
                  <button key={p.id} onClick={() => { setActiveProfileId(p.id); setShowProfileSwitcher(false); }} className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all text-left ${activeProfileId === p.id ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-600'}`}>
                    <div className={`w-6 h-6 rounded-full ${p.avatarColor} text-[10px] text-white flex items-center justify-center font-black`}>{p.name.charAt(0)}</div>
                    <span className="text-xs font-bold truncate flex-1">{p.name}</span>
                    {activeProfileId === p.id && <Check size={12} />}
                  </button>
                ))}
                <div className="h-px bg-slate-100 my-1"></div>
                <button onClick={() => { setCurrentPage('setup'); setShowProfileSwitcher(false); }} className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 text-slate-400 text-xs font-bold">
                  <Plus size={14} /> {t.addProfile}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    {currentPage === 'setup' ? (
      <div className="bg-slate-100 p-1 rounded-full flex gap-1">
        <button onClick={() => setLang('zh')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'zh' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>繁中</button>
        <button onClick={() => setLang('en')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>EN</button>
      </div>
    ) : (
      <button onClick={() => setCurrentPage('setup')} className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm active:scale-90 transition-all"><User size={20} /></button>
    )}
  </div>
 
 {/* Scrollable Content Area */}
 <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 scrollbar-hide pb-32">
 
 {currentPage === 'setup' ? (
 <div className="animate-in fade-in duration-500 pb-20">

  <div className="mb-8">
   <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Users size={16} /> {t.familyMembers}</h2>
   <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
     {profiles.map(p => (
       <button key={p.id} onClick={() => setActiveProfileId(p.id)} className={`flex-shrink-0 relative w-20 h-24 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all ${activeProfileId === p.id ? 'bg-white border-indigo-500 shadow-md' : 'bg-slate-50 border-transparent opacity-60 hover:opacity-100'}`}>
         <div className={`w-10 h-10 ${p.avatarColor} rounded-full flex items-center justify-center text-white font-black text-sm`}>{p.name.charAt(0)}</div>
         <span className="text-xs font-bold text-slate-700 truncate max-w-full px-1">{p.name}</span>
         {activeProfileId === p.id && <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-white"></div>}
       </button>
     ))}
     <button onClick={createNewProfile} className="flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center gap-2 bg-slate-100 border-2 border-dashed border-slate-300 text-slate-400 hover:bg-slate-200 hover:border-slate-400 transition-all">
       <Plus size={24} />
       <span className="text-[10px] font-bold">{t.addProfile}</span>
     </button>
   </div>
   <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-xs text-indigo-700 font-medium leading-relaxed">
     {t.familyHelp}
   </div>
 </div>

 {/* 個人資料表單 */}
 <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 relative overflow-hidden transition-all duration-300">
  <div className={`absolute top-0 left-0 w-full h-1.5 ${currentProfile.avatarColor}`}></div>
  <div className="flex justify-between items-center mb-6 cursor-pointer group" onClick={() => setIsProfileExpanded(!isProfileExpanded)}>
    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 group-hover:text-indigo-600 transition-colors">
      <div className={`w-3 h-3 rounded-full ${currentProfile.avatarColor}`}></div>
      {t.editProfile}
      <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${isProfileExpanded ? 'rotate-180' : ''}`} />
    </h3>
    {profiles.length > 1 && (
      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        {isDeleteConfirming ? (
          <>
            <button onClick={() => setIsDeleteConfirming(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600 px-3 py-1 bg-slate-100 rounded-lg transition-all">{t.cancel}</button>
            <button onClick={() => deleteProfile(currentProfile.id)} className="text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 px-3 py-1 rounded-lg shadow-sm transition-all animate-in fade-in zoom-in duration-200">{t.confirmDelete}</button>
          </>
        ) : (
          <button onClick={() => setIsDeleteConfirming(true)} className="text-xs font-bold text-rose-400 hover:text-rose-600 px-3 py-1 bg-rose-50 rounded-lg transition-all">{t.deleteProfile}</button>
        )}
      </div>
    )}
  </div>

  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isProfileExpanded ? 'max-h-[1000px] opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}>
    <div className="mb-6">
      <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">{t.nameLabel}</label>
      <input type="text" value={currentProfile.name} onChange={e => handleInputChange('name', e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-lg font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" />
    </div>

    <div className="grid grid-cols-2 gap-6 mb-8">
    <div><label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">{t.height}</label><input type="text" inputMode="numeric" value={currentProfile.height} onFocus={(e) => e.target.select()} onChange={e => handleInputChange('height', e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
    <div><label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">{t.weight}</label><input type="text" inputMode="numeric" value={currentProfile.weight} onFocus={(e) => e.target.select()} onChange={e => handleInputChange('weight', e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
    <div><label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">{t.age}</label><input type="text" inputMode="numeric" value={currentProfile.age} onFocus={(e) => e.target.select()} onChange={e => handleInputChange('age', e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
    <div><label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">{t.gender}</label><div className="flex bg-slate-50 rounded-2xl p-1 h-[60px]"><button onClick={() => handleInputChange('gender', 'male')} className={`flex-1 rounded-xl text-sm font-bold transition-all ${currentProfile.gender === 'male' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>{t.male}</button><button onClick={() => handleInputChange('gender', 'female')} className={`flex-1 rounded-xl text-sm font-bold transition-all ${currentProfile.gender === 'female' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>{t.female}</button></div></div>
    </div>
    
    {/* Collapsible Activity Section */}
    <div className="mb-10 transition-all duration-300">
      <div 
        onClick={() => setIsActivityExpanded(!isActivityExpanded)}
        className="flex justify-between items-center mb-4 ml-1 cursor-pointer group select-none"
      >
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-500 transition-colors cursor-pointer">
          {t.activity}
        </label>
        <div className="flex items-center gap-2">
           {!isActivityExpanded && (
             <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg animate-in fade-in">
               {activityOptions.find(o => o.id === currentProfile.activity)?.label}
             </span>
           )}
           <ChevronDown 
             size={18} 
             className={`text-slate-300 transition-transform duration-300 ${isActivityExpanded ? 'rotate-180' : ''} group-hover:text-indigo-500`} 
           />
        </div>
      </div>
      
      <div className={`space-y-3 overflow-hidden transition-all duration-500 ease-in-out ${isActivityExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        {activityOptions.map(option => (
          <button 
            key={option.id} 
            onClick={() => handleInputChange('activity', option.id)} 
            className={`w-full flex justify-between items-center py-4 px-6 rounded-2xl text-sm font-bold transition-all border-2 ${currentProfile.activity === option.id ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' : 'bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100'}`}
          >
            {option.label}
            {currentProfile.activity === option.id && <Check size={18} />}
          </button>
        ))}
      </div>
    </div>
  </div>
  <button disabled={!currentProfile.height || !currentProfile.weight || !currentProfile.age} onClick={() => setCurrentPage('dashboard')} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white py-5 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">{t.setupTitle} <ArrowRight size={20} /></button>
 </div>
 </div>
 ) : (
 <div className="animate-in slide-in-from-bottom-4 duration-500">

  <h2 className="text-xl font-black text-slate-800 mb-6">{t.dashboardGreeting}</h2>
 
 {/* Dashboard 統計卡片 */}
 <div className="relative overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-500 to-indigo-600 rounded-[40px] p-8 text-white shadow-2xl shadow-teal-50 mb-6 transition-all group">
   <div className="relative z-10">
     <div className="text-xs font-bold opacity-80 mb-2 uppercase tracking-widest flex justify-between">
       <span>{t.remaining} / {nutritionTargets.calories} KCAL</span>
       <button onClick={() => setShowHistoryModal(true)} className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full text-[9px] backdrop-blur-sm transition-all">
         <History size={10} />
         <span>{t.historyTitle}</span>
       </button>
     </div>
     <div className="flex items-baseline gap-2 mb-8"><span className="text-7xl font-black tracking-tighter">{Math.max(0, nutritionTargets.calories - dailyConsumed.calories)}</span><span className="text-sm font-bold opacity-80 uppercase">{t.kcalUnit}</span></div>
     <div className="grid grid-cols-3 gap-5 mb-8">
       <ProgressBar label={t.protein} current={dailyConsumed.protein} target={nutritionTargets.protein} unit="g" />
       <ProgressBar label={t.carbs} current={dailyConsumed.carbs} target={nutritionTargets.carbs} unit="g" />
       <ProgressBar label={t.fat} current={dailyConsumed.fat} target={nutritionTargets.fat} unit="g" />
     </div>
     <div className="bg-black/10 backdrop-blur-md border border-white/10 rounded-[30px] p-5 flex justify-between items-center">
       <div className="cursor-default">
         <div className="text-[10px] font-black opacity-60 uppercase mb-1 tracking-widest">{t.bmi} {nutritionTargets.bmi} | {parseFloat(nutritionTargets.bmi) < 18.5 ? t.statusUnder : parseFloat(nutritionTargets.bmi) < 24 ? t.statusNormal : t.statusOver}</div>
         <div className="flex items-center gap-2"><span className="text-sm font-black tracking-tight">{t.hydrationTimer} {currentProfile.waterIntake}ml / 2000ml</span></div>
       </div>
       <div className="text-right"><button onClick={() => setShowWaterMenu(true)} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm active:scale-90 transition-all"><Droplets size={20} fill="currentColor" /></button></div>
     </div>
   </div>
 </div>

 <button onClick={() => setShowAiModal(true)} className="w-full bg-white rounded-[32px] p-5 shadow-sm border border-slate-50 flex items-center justify-between mb-4 group active:scale-[0.98] transition-all"><div className="flex items-center gap-4"><div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-violet-500"><Sparkles size={20} /></div><span className="font-black text-slate-800 text-sm">{t.aiRec}</span></div><div className="bg-violet-50 text-violet-500 p-1.5 rounded-full"><Plus size={16} /></div></button>
 <div className="bg-white rounded-[24px] p-2 shadow-sm border border-slate-100 flex items-center mb-8 focus-within:ring-2 focus-within:ring-indigo-100 transition-all"><span className="pl-4 text-violet-400"><Search size={18} /></span><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.searchPlaceholder} className="flex-1 px-3 bg-transparent border-none outline-none text-base font-bold text-slate-600 placeholder:text-slate-300" /><button onClick={handleAiSearch} disabled={isAiSearching || !searchQuery.trim()} className="bg-violet-600 text-white px-5 py-2.5 rounded-2xl text-[11px] font-black active:scale-95 transition-all shadow-md flex items-center gap-2 disabled:bg-slate-300">{isAiSearching ? <Loader2 size={14} className="animate-spin" /> : null}{isAiSearching ? t.aiSearching : t.aiSearchBtn}</button></div>
 
 {/* Shape & Stretch Button */}
 <button onClick={() => setShowShapeStretch(true)} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-5 rounded-[32px] shadow-lg shadow-indigo-200 active:scale-98 transition-all flex items-center justify-between group mb-4">
   <div className="flex items-center gap-4">
     <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform">
        <Zap size={24} fill="currentColor" />
     </div>
     <div className="text-left">
       <h4 className="text-lg font-black mb-0.5">{t.shapeStretchTitle}</h4>
       <p className="text-indigo-100 text-[10px] font-bold opacity-90">{t.shapeStretchDesc}</p>
     </div>
   </div>
   <ArrowRight size={20} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
 </button>

 {/* NuVision Button */}
 <button onClick={() => setShowNuVisionModal(true)} className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-5 rounded-[32px] shadow-lg shadow-blue-200 active:scale-98 transition-all flex items-center justify-between group mb-12">
   <div className="flex items-center gap-4">
     <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform">
        <Eye size={24} fill="currentColor" />
     </div>
     <div className="text-left">
       <h4 className="text-lg font-black mb-0.5">NuVision</h4>
       <p className="text-blue-100 text-[10px] font-bold opacity-90">{lang === 'zh' ? 'AI 智能街市助手' : 'AI Smart Market Assistant'}</p>
     </div>
   </div>
   <ArrowRight size={20} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
 </button>

 </div>
 )}
 </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-black text-lg text-slate-800 flex items-center gap-2"><History size={20} className="text-indigo-500"/> {t.historyTitle}</h3>
              <button onClick={() => setShowHistoryModal(false)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 shadow-sm"><X size={18} /></button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
              {currentProfile.logs.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3"><Search size={24} className="opacity-50"/></div>
                  <p className="text-xs font-bold">{t.noHistory}</p>
                </div>
              ) : (
                currentProfile.logs.map(log => (
                  <div key={log.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                    <div className="text-2xl">{log.emoji}</div>
                    <div className="flex-1">
                      <div className="font-black text-slate-700 text-sm mb-1">{log.name}</div>
                      <div className="text-[10px] font-bold text-slate-400 flex gap-2">
                        <span>🔥 {Math.round(log.calories)}</span>
                        <span>🥩 {Math.round(log.protein)}g</span>
                        <span>🍞 {Math.round(log.carbs)}g</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-300 mb-1">{log.time}</div>
                      <button onClick={() => removeLogEntry(log.id)} className="text-rose-400 p-1.5 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Search & Analysis Modal */}
      {showAiModal && (
        <div className="absolute inset-0 bg-white z-[110] flex flex-col animate-in slide-in-from-bottom-full duration-300">
          {selectedDish ? (
            // --- DETAIL VIEW ---
            <>
              <div className="p-6 bg-white border-b border-slate-50 flex justify-between items-center sticky top-0 z-10">
                <button onClick={() => setSelectedDish(null)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100"><ArrowLeft size={20} /></button>
                <h3 className="font-black text-lg text-slate-800">{t.foodBriefTitle}</h3>
                <div className="w-10"></div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 pb-32">
                 {/* Dish Info */}
                 <div className="text-center mb-6">
                    <div className="text-6xl mb-4 animate-in zoom-in duration-300">{selectedDish.emoji}</div>
                    <h2 className="text-2xl font-black text-slate-800">{selectedDish.name}</h2>
                 </div>
                 
                 {/* Ingredients */}
                 <div className="mb-6">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.ingredients}</h4>
                    <div className="bg-slate-50 p-4 rounded-2xl text-sm font-bold text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {selectedDish.ingredients}
                    </div>
                 </div>

                 {/* Method */}
                 <div className="mb-6">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.method}</h4>
                    <div className="space-y-2">
                        {selectedDish.method.map((step, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="min-w-[20px] h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black mt-0.5">{i+1}</div>
                                <p className="text-sm font-medium text-slate-600">{step}</p>
                            </div>
                        ))}
                    </div>
                 </div>

                 {/* Nutrition */}
                 <div className="mb-8">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.nutritionalInfo}</h4>
                    <div className="bg-slate-900 text-white rounded-[24px] p-5">
                       <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                           <span className="text-sm font-bold text-slate-400">Calories</span>
                           <span className="text-2xl font-black">{selectedDish.calories} kcal</span>
                       </div>
                       <div className="grid grid-cols-3 gap-2 text-center mb-6">
                           <div><div className="text-lg font-bold text-emerald-400">{selectedDish.protein}g</div><div className="text-[10px] text-slate-500">PRO</div></div>
                           <div><div className="text-lg font-bold text-amber-400">{selectedDish.carbs}g</div><div className="text-[10px] text-slate-500">CARB</div></div>
                           <div><div className="text-lg font-bold text-rose-400">{selectedDish.fat}g</div><div className="text-[10px] text-slate-500">FAT</div></div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div className="flex justify-between">
                           <span className="text-xs text-slate-400">{t.satFat}</span>
                           <span className="text-xs font-bold">{selectedDish.saturatedFat}g</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-xs text-slate-400">{t.transFat}</span>
                           <span className="text-xs font-bold">{selectedDish.transFat}g</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-xs text-slate-400">{t.sodium}</span>
                           <span className="text-xs font-bold">{selectedDish.sodium}mg</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-xs text-slate-400">{t.sugar}</span>
                           <span className="text-xs font-bold">{selectedDish.sugar}g</span>
                        </div>
                      </div>
                    </div>
                 </div>

                 <button onClick={() => handleAddDish(selectedDish)} className="w-full bg-indigo-600 text-white py-4 rounded-[24px] font-black text-lg shadow-xl shadow-indigo-200 active:scale-95 transition-all">
                    {t.addIntake}
                 </button>
              </div>
            </>
          ) : (
            // --- LIST VIEW ---
            <>
              <div className="p-6 bg-white border-b border-slate-50 flex justify-between items-center sticky top-0 z-10">
                <button onClick={() => setShowAiModal(false)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100"><ArrowLeft size={20} /></button>
                <h3 className="font-black text-lg text-slate-800">{t.aiRec}</h3>
                <div className="w-10"></div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 pb-32">
                {/* Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
                  {(['breakfast', 'lunch', 'dinner'] as const).map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${activeCategory === cat ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>
                      {t[cat]}
                    </button>
                  ))}
                </div>

                {/* Recipe Cards */}
                <div className="space-y-4">
                  {currentCategoryRecipes.map((dish, idx) => (
                    <button key={dish.id} onClick={() => setSelectedDish(dish)} className="w-full bg-white border border-slate-100 rounded-[24px] p-5 flex items-center gap-4 hover:border-indigo-100 hover:shadow-md transition-all group text-left">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">{dish.emoji}</div>
                      <div className="flex-1">
                        <h4 className="font-black text-slate-800 mb-1">{dish.name}</h4>
                        <div className="flex gap-3 text-[10px] font-bold text-slate-400">
                          <span className="flex items-center gap-1"><Zap size={10} className="text-amber-400" /> {dish.calories} kcal</span>
                          <span className="flex items-center gap-1"><Scale size={10} className="text-emerald-400" /> P: {dish.protein}g</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Plus size={16} /></div>
                    </button>
                  ))}
                </div>

                <button onClick={refreshBatch} className="w-full mt-6 py-4 bg-slate-50 text-slate-400 rounded-2xl text-xs font-black flex items-center justify-center gap-2 hover:bg-slate-100 hover:text-slate-600 transition-all">
                  <RefreshCw size={14} /> {t.refresh}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Water Menu Modal */}
      {showWaterMenu && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowWaterMenu(false)}>
          <div className="bg-white w-full max-w-sm rounded-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300" onClick={e => e.stopPropagation()}>
            <h3 className="font-black text-lg text-slate-800 mb-6 flex items-center gap-2"><Droplets className="text-cyan-500"/> {t.quickAdd}</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[200, 300, 500].map(amt => (
                <button key={amt} onClick={() => addWater(amt)} className="bg-cyan-50 hover:bg-cyan-100 text-cyan-700 py-4 rounded-2xl font-black text-lg transition-colors">
                  +{amt}ml
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <input type="number" value={customWaterVal} onChange={e => setCustomWaterVal(e.target.value)} placeholder={t.customWater} className="flex-1 bg-slate-50 rounded-2xl px-5 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-cyan-200" />
              <button onClick={() => addWater(customWaterVal)} className="bg-cyan-500 text-white px-6 rounded-2xl font-black shadow-lg shadow-cyan-200 active:scale-95 transition-all">{t.add}</button>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis Result Modal */}
      {aiSearchResult && (
        <div className="absolute inset-0 bg-white z-[120] flex flex-col animate-in slide-in-from-bottom-full duration-300">
           {/* ... Header ... */}
           <div className="p-6 bg-white flex justify-between items-center">
             <button onClick={() => setAiSearchResult(null)} className="p-2 bg-slate-50 rounded-full"><X size={20}/></button>
             <span className="font-black text-lg">{t.aiSub}</span>
             <div className="w-9"></div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 pt-0">
             <div className="text-center mb-8">
               <div className="text-6xl mb-4 animate-in zoom-in duration-300">{aiSearchResult.emoji}</div>
               <h2 className="text-2xl font-black text-slate-800 mb-2">{aiSearchResult.name}</h2>
               <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[80%] mx-auto">{aiSearchResult.brief}</p>
             </div>

             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{t.selectPortion}</h3>
             <div className="space-y-3 mb-8">
               {aiSearchResult.portions?.map((p, idx) => (
                 <div key={idx} onClick={() => setSelectedPortion(p)} className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedPortion === p ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-white'}`}>
                   <div className="flex justify-between items-center mb-1">
                     <span className={`font-bold ${selectedPortion === p ? 'text-indigo-700' : 'text-slate-700'}`}>{p.label}</span>
                     {selectedPortion === p && <Check size={16} className="text-indigo-600"/>}
                   </div>
                   {p.isCustomBase && selectedPortion === p ? (
                      <div className="mt-3 flex items-center gap-3 animate-in fade-in">
                        <input type="number" value={customGramAmount} onClick={e => e.stopPropagation()} onChange={e => setCustomGramAmount(e.target.value)} className="w-24 bg-white border border-indigo-200 rounded-lg px-2 py-1 text-center font-bold text-indigo-700 outline-none" autoFocus />
                        <span className="text-xs font-bold text-indigo-400">g</span>
                      </div>
                   ) : (
                     <div className="text-xs text-slate-400 font-medium">{Math.round(p.calories)} kcal</div>
                   )}
                 </div>
               ))}
             </div>

             {/* Nutrition Preview */}
             {currentAiNutrition && (
               <div className="bg-slate-900 text-white rounded-[32px] p-6 mb-6">
                 <div className="text-center mb-6">
                   <div className="text-4xl font-black mb-1">{currentAiNutrition.calories}</div>
                   <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Kcal</div>
                 </div>
                 <div className="grid grid-cols-3 gap-4 text-center mb-6">
                   <div><div className="text-xl font-bold text-emerald-400">{currentAiNutrition.protein}</div><div className="text-[10px] text-slate-500">PRO</div></div>
                   <div><div className="text-xl font-bold text-amber-400">{currentAiNutrition.carbs}</div><div className="text-[10px] text-slate-500">CARB</div></div>
                   <div><div className="text-xl font-bold text-rose-400">{currentAiNutrition.fat}</div><div className="text-[10px] text-slate-500">FAT</div></div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between">
                       <span className="text-xs text-slate-400">{t.satFat}</span>
                       <span className="text-xs font-bold">{currentAiNutrition.saturatedFat}g</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-xs text-slate-400">{t.transFat}</span>
                       <span className="text-xs font-bold">{currentAiNutrition.transFat}g</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-xs text-slate-400">{t.sodium}</span>
                       <span className="text-xs font-bold">{currentAiNutrition.sodium}mg</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-xs text-slate-400">{t.sugar}</span>
                       <span className="text-xs font-bold">{currentAiNutrition.sugar}g</span>
                    </div>
                 </div>
               </div>
             )}
             
             <button onClick={handleAddAiResult} disabled={!selectedPortion} className="w-full bg-indigo-600 text-white py-4 rounded-[24px] font-black text-lg shadow-xl shadow-indigo-200 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100">
               {t.addIntake}
             </button>
           </div>
        </div>
      )}

      {/* Refinement Overlay (AI Needs Info) */}
      {refinementPrompt && (
        <div className="absolute inset-0 bg-white z-[130] flex flex-col p-8 justify-center animate-in fade-in">
           <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-2xl flex items-center justify-center mb-6"><Info size={32}/></div>
           <h3 className="text-2xl font-black text-slate-800 mb-2">{t.refinementTitle}</h3>
           <p className="text-slate-500 font-medium mb-8">{refinementPrompt}</p>
           <textarea value={refinementDetails} onChange={e => setRefinementDetails(e.target.value)} placeholder={t.refinementPlaceholder} className="w-full h-32 bg-slate-50 rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-6" />
           <div className="flex gap-4">
             <button onClick={() => { setRefinementPrompt(null); setIsAiSearching(false); }} className="flex-1 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-all">{t.cancel}</button>
             <button onClick={handleAiSearch} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-indigo-200 active:scale-95 transition-all">{t.refinementConfirm}</button>
           </div>
        </div>
      )}

      {/* Chat Overlay */}
      {showChatOverlay && (
        <div className="absolute inset-0 bg-white z-[150] flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-4 bg-white border-b border-slate-50 flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowChatOverlay(false)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500"><ArrowLeft size={16}/></button>
              <div>
                <div className="font-black text-slate-800 text-sm">{t.aiMentorLabel}</div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Online</div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
             {chatMessages.length === 0 && (
               <div className="p-6 text-center">
                 <div className="w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4"><Brain size={32}/></div>
                 <p className="text-sm font-bold text-slate-600">{t.aiChatWelcome}</p>
               </div>
             )}
             {chatMessages.map((msg, idx) => (
               <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed whitespace-pre-wrap shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}`}>
                   {msg.text || <div className="flex gap-1"><div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-100"></div><div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-200"></div></div>}
                 </div>
               </div>
             ))}
             <div ref={chatEndRef} />
          </div>
          <div className="p-4 bg-white border-t border-slate-50">
            <div className="text-[10px] text-slate-400 text-center mb-2">{t.aiChatDisclaimer}</div>
            <div className="flex gap-2">
              <input 
                 type="text" 
                 value={chatInput} 
                 onChange={e => setChatInput(e.target.value)} 
                 onKeyDown={e => e.key === 'Enter' && handleSendChatMessage()}
                 placeholder={t.aiChatPlaceholder} 
                 className="flex-1 bg-slate-100 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                 disabled={isChatLoading}
              />
              <button onClick={handleSendChatMessage} disabled={!chatInput.trim() || isChatLoading} className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 active:scale-90 transition-all disabled:bg-slate-300 disabled:shadow-none">
                {isChatLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shape & Stretch Modal */}
      {showShapeStretch && (
        <div className="absolute inset-0 bg-slate-50 z-[200] flex flex-col animate-in slide-in-from-right duration-300">
           {/* Header */}
           <div className="bg-white p-4 flex items-center gap-4 shadow-sm z-10">
             <button onClick={() => {
                if (selectedDish) setSelectedDish(null);
                if (selectedShapeCategory) setSelectedShapeCategory(null);
                else setShowShapeStretch(false);
             }} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600">
               <ArrowLeft size={20} />
             </button>
             <h3 className="font-black text-lg text-slate-800">{selectedShapeCategory ? (translations[lang][selectedShapeCategory] || t.shapeStretchTitle) : t.shapeStretchTitle}</h3>
           </div>

           {/* Content */}
           <div className="flex-1 overflow-y-auto p-6">
              {!selectedShapeCategory ? (
                <div className="grid gap-4">
                   {[
                     { id: 'catEye', icon: <Eye size={24}/>, color: 'bg-sky-500', text: 'text-sky-100' },
                     { id: 'catCirculation', icon: <Activity size={24}/>, color: 'bg-rose-500', text: 'text-rose-100' },
                     { id: 'catStress', icon: <Moon size={24}/>, color: 'bg-violet-500', text: 'text-violet-100' },
                     { id: 'catCore', icon: <Shield size={24}/>, color: 'bg-amber-500', text: 'text-amber-100' },
                     { id: 'catSleep', icon: <Moon size={24}/>, color: 'bg-indigo-900', text: 'text-indigo-200' },
                   ].map(cat => (
                     <button key={cat.id} onClick={() => setSelectedShapeCategory(cat.id)} className={`${cat.color} text-white p-6 rounded-[32px] flex items-center gap-4 shadow-lg active:scale-98 transition-all group`}>
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                          {cat.icon}
                        </div>
                        <div className="text-left flex-1">
                          <h4 className="text-lg font-black">{t[cat.id]}</h4>
                          <p className={`text-xs font-bold ${cat.text}`}>{t[`${cat.id}Desc`]}</p>
                        </div>
                        <ChevronRight className="opacity-60" />
                     </button>
                   ))}
                </div>
              ) : (
                <>
                  {/* Filter Tabs */}
                  <div className="flex bg-slate-200 p-1 rounded-2xl mb-6">
                    {(['all', 'stretch', 'exercise'] as const).map(tab => (
                      <button key={tab} onClick={() => setShapeStretchTab(tab)} className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${shapeStretchTab === tab ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}>
                        {t[`tab${tab.charAt(0).toUpperCase() + tab.slice(1)}`]}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4 pb-20">
                    {filteredExercises.map(ex => (
                      <div key={ex.id} className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
                              {ex.type === 'stretch' ? <Activity size={20}/> : <Zap size={20}/>}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800 leading-tight mb-1">{ex.name}</h4>
                              <div className="flex gap-2 text-[10px] font-bold text-slate-400">
                                <span className="bg-slate-100 px-2 py-0.5 rounded-md">{ex.duration}</span>
                                <span className="bg-slate-100 px-2 py-0.5 rounded-md">{ex.sets}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Video Player Section with Loop */}
                        {ex.demoVideoUrl ? (
                          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden mb-4 relative group">
                             <video 
                               src={ex.demoVideoUrl} 
                               className="w-full h-full object-cover" 
                               controls 
                               loop 
                               playsInline
                               autoPlay={false} 
                               muted={false} 
                             />
                          </div>
                        ) : (
                           <div className="w-full aspect-video bg-slate-50 rounded-xl flex flex-col items-center justify-center text-slate-300 mb-4 border-2 border-dashed border-slate-200">
                             <Video size={32} className="mb-2 opacity-50"/>
                             <span className="text-xs font-bold">No Preview</span>
                           </div>
                        )}

                        <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 font-medium leading-relaxed mb-3">
                          {ex.instruction}
                        </div>
                        
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                           <span className="uppercase tracking-wider">Equipment:</span>
                           <span className="text-indigo-500">{t[ex.equipment]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
           </div>
        </div>
      )}

      {/* NuVision Modal */}
      {showNuVisionModal && (
        <div className="absolute inset-0 bg-slate-50 z-[250] flex flex-col animate-in slide-in-from-bottom-full duration-300">
           {/* Header */}
           <div className="bg-white px-6 py-4 flex justify-between items-center shadow-sm z-30 sticky top-0">
             <button onClick={() => { setShowNuVisionModal(false); setNuVisionResult(null); setNuVisionCart([]); }} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
               <X size={20} />
             </button>
             <h3 className="font-black text-lg text-slate-800">{t.nuVisionTitle}</h3>
             <div className="w-10"></div>
           </div>

           <div className="flex-1 overflow-y-auto bg-slate-50 relative">
              {!nuVisionResult ? (
                <div className="flex flex-col min-h-full pb-32">
                   {/* Welcome & Budget Header */}
                   <div className="bg-white p-6 rounded-b-[32px] shadow-sm mb-6">
                     <div className="text-center mb-6">
                       <h2 className="text-2xl font-black text-slate-800 mb-1">{t.marketChallenge}</h2>
                       <p className="text-slate-400 font-bold text-xs">{t.budgetGoal}</p>
                     </div>

                     {/* Budget Progress */}
                     <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <div className="flex justify-between items-end mb-2">
                          <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.remainingBudget}</div>
                            <div className={`text-3xl font-black tracking-tight ${50 - nuVisionCart.reduce((sum, id) => sum + (Object.values(NUVISION_ITEMS).flat().find(i => i.id === id)?.price || 0), 0) < 10 ? 'text-rose-500' : 'text-emerald-500'}`}>
                              ${50 - nuVisionCart.reduce((sum, id) => sum + (Object.values(NUVISION_ITEMS).flat().find(i => i.id === id)?.price || 0), 0)}
                            </div>
                          </div>
                          <div className="text-right">
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.selectedItems}</div>
                             <div className="text-xl font-black text-indigo-600">{nuVisionCart.length} <span className="text-slate-300 text-sm">/ 4</span></div>
                          </div>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                           <div 
                             className={`h-full rounded-full transition-all duration-500 ${50 - nuVisionCart.reduce((sum, id) => sum + (Object.values(NUVISION_ITEMS).flat().find(i => i.id === id)?.price || 0), 0) < 10 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                             style={{ width: `${(1 - (50 - nuVisionCart.reduce((sum, id) => sum + (Object.values(NUVISION_ITEMS).flat().find(i => i.id === id)?.price || 0), 0)) / 50) * 100}%` }}
                           ></div>
                        </div>
                     </div>
                   </div>
                   
                   {/* Category Tabs */}
                   <div className="px-6 mb-6 sticky top-0 z-20 bg-slate-50 py-2 -mx-2 overflow-x-auto flex gap-2 scrollbar-hide">
                      <button onClick={() => setNuVisionCategory('all')} className={`px-5 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${nuVisionCategory === 'all' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-slate-400 border border-slate-100'}`}>{t.all}</button>
                      {Object.entries({ grains: t.grains, meat: t.meat, fruits: t.fruits, veggies: t.veggies }).map(([key, label]) => (
                        <button key={key} onClick={() => setNuVisionCategory(key)} className={`px-5 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${nuVisionCategory === key ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-slate-400 border border-slate-100'}`}>
                          {label}
                        </button>
                      ))}
                   </div>

                   {/* Food Grid */}
                   <div className="px-6 grid grid-cols-2 gap-4">
                     {Object.entries(NUVISION_ITEMS).map(([catKey, items]) => {
                       if (nuVisionCategory !== 'all' && nuVisionCategory !== catKey) return null;
                       return items.map((item: any) => {
                         const isSelected = nuVisionCart.includes(item.id);
                         return (
                           <button 
                             key={item.id} 
                             onClick={() => toggleNuVisionItem(item.id)}
                             className={`relative p-4 rounded-[24px] border-2 transition-all flex flex-col items-center text-center group ${isSelected ? 'bg-indigo-50 border-indigo-500 shadow-lg shadow-indigo-100 scale-[1.02]' : 'bg-white border-transparent shadow-sm hover:shadow-md hover:scale-[1.02]'}`}
                           >
                             <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.emoji}</div>
                             <div className={`font-black text-sm mb-1 ${isSelected ? 'text-indigo-700' : 'text-slate-700'}`}>{getItemName(item.name)}</div>
                             <div className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">${item.price}</div>
                             
                             {isSelected && (
                               <div className="absolute top-3 right-3 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-md animate-in zoom-in duration-200">
                                 <Check size={14} strokeWidth={3} />
                               </div>
                             )}
                           </button>
                         );
                       });
                     })}
                   </div>
                </div>
              ) : (
                <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4">
                   {/* Score Card */}
                   <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-[32px] p-8 text-white text-center shadow-lg shadow-blue-200 relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="text-6xl font-black mb-2 tracking-tighter">{nuVisionResult.score}</div>
                        <div className="text-xs font-bold opacity-80 uppercase tracking-widest mb-6">{t.nutritionScore}</div>
                        <p className="text-sm font-medium leading-relaxed opacity-90 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                          {nuVisionResult.summary}
                        </p>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                   </div>

                   {/* Macros */}
                   <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{t.macroRatio}</h4>
                      <div className="flex gap-2 h-4 rounded-full overflow-hidden mb-4">
                         <div className="bg-emerald-400 h-full" style={{ width: nuVisionResult.macros?.protein || '33%' }}></div>
                         <div className="bg-amber-400 h-full" style={{ width: nuVisionResult.macros?.carbs || '33%' }}></div>
                         <div className="bg-rose-400 h-full" style={{ width: nuVisionResult.macros?.fat || '33%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-slate-600">
                         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> {t.protein} {nuVisionResult.macros?.protein}</div>
                         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400"></div> {t.carbs} {nuVisionResult.macros?.carbs}</div>
                         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-400"></div> {t.fat} {nuVisionResult.macros?.fat}</div>
                      </div>
                   </div>

                   {/* Deep Analysis (The Bad Stuff) */}
                   <div className="bg-slate-50 p-6 rounded-[24px]">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{t.deepAnalysis}</h4>
                      <div className="grid grid-cols-2 gap-4">
                         {[
                           { label: t.satFat, val: nuVisionResult.micros?.saturatedFat, color: 'text-rose-500' },
                           { label: t.transFat, val: nuVisionResult.micros?.transFat, color: 'text-rose-600' },
                           { label: t.sodium, val: nuVisionResult.micros?.sodium, color: 'text-amber-600' },
                           { label: t.sugar, val: nuVisionResult.micros?.sugar, color: 'text-amber-500' },
                         ].map((item, i) => (
                           <div key={i} className="bg-white p-3 rounded-xl border border-slate-100">
                              <div className="text-[10px] text-slate-400 mb-1">{item.label}</div>
                              <div className={`font-black ${item.color}`}>{item.val}</div>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Hidden Nutrients (The Good Stuff) */}
                   <div className="bg-indigo-50 p-6 rounded-[24px] border border-indigo-100">
                      <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Sparkles size={14}/> {t.hiddenNutrients}</h4>
                      <div className="space-y-3">
                         {nuVisionResult.hiddenNutrients?.map((item: any, i: number) => (
                           <div key={i} className="flex gap-3 items-start">
                              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-indigo-500 font-black text-xs shadow-sm mt-0.5">{i+1}</div>
                              <div>
                                 <div className="font-bold text-indigo-900 text-sm">{item.food}</div>
                                 <div className="text-xs text-indigo-700 leading-relaxed">{item.benefit}</div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Advice */}
                   <div className="bg-emerald-50 p-6 rounded-[24px] border border-emerald-100">
                      <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Brain size={14}/> {t.aiAdvice}</h4>
                      <p className="text-sm font-medium text-emerald-800 leading-relaxed">
                         {nuVisionResult.advice}
                      </p>
                   </div>

                   <button onClick={() => { setNuVisionResult(null); setNuVisionCart([]); }} className="w-full py-4 rounded-[24px] font-black text-slate-400 hover:bg-slate-100 transition-all">
                     {t.scanNext}
                   </button>
                </div>
              )}
           </div>

           {/* Floating Analyze Button (Only show when not analyzing result) */}
           {!nuVisionResult && (
             <div className="absolute bottom-6 left-6 right-6 z-40">
               <button 
                 onClick={handleNuVisionAnalyze} 
                 disabled={nuVisionCart.length < 3 || isNuVisionAnalyzing} 
                 className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 rounded-[24px] font-black text-lg shadow-xl shadow-indigo-200 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-3"
               >
                  {isNuVisionAnalyzing ? <Loader2 className="animate-spin" /> : <Sparkles size={20} className="text-yellow-300" />}
                  {isNuVisionAnalyzing ? t.aiAnalyzing : (
                    <div className="flex items-center gap-2">
                       <span>{t.aiAnalyzeBtn}</span>
                       <span className="bg-white/20 px-2 py-0.5 rounded-lg text-sm">
                         ${nuVisionCart.reduce((sum, id) => sum + (Object.values(NUVISION_ITEMS).flat().find(i => i.id === id)?.price || 0), 0)}
                       </span>
                    </div>
                  )}
               </button>
             </div>
           )}
        </div>
      )}

      {/* Action Menu (Floating) */}
      <div className={`fixed bottom-28 left-1/2 -translate-x-1/2 flex flex-col gap-3 transition-all duration-300 ${showActionMenu ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-10 opacity-0 pointer-events-none'} z-[100]`}>
        <button onClick={() => { setShowAiModal(true); setShowActionMenu(false); }} className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-lg shadow-slate-200 whitespace-nowrap">
          <span className="text-xs font-bold text-slate-600">{t.aiRec}</span>
          <div className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center"><Sparkles size={16}/></div>
        </button>
        <button onClick={() => { setShowWaterMenu(true); setShowActionMenu(false); }} className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-lg shadow-slate-200 whitespace-nowrap">
          <span className="text-xs font-bold text-slate-600">{t.water}</span>
          <div className="w-8 h-8 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center"><Droplets size={16}/></div>
        </button>
      </div>
      
      {/* Bottom Navigation Bar */}
      {currentPage === 'dashboard' && (
        <div className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-md border-t border-slate-100 flex justify-between items-end px-6 pb-6 pt-2 z-[90]">
            <button onClick={() => { setShowChatOverlay(false); setShowShapeStretch(false); }} className="p-2 text-indigo-600"><Zap size={24} fill="currentColor"/></button>
            <button onClick={() => setShowAiModal(true)} className="p-2 text-slate-300 hover:text-slate-500"><Search size={24}/></button>
            
            <div className="relative">
               <button onClick={() => setShowActionMenu(!showActionMenu)} className="w-14 h-14 bg-indigo-600 rounded-[20px] flex items-center justify-center text-white shadow-xl shadow-indigo-200 mb-2 active:scale-95 transition-all">
                 <Plus size={28} />
               </button>
            </div>

            <button onClick={() => setShowChatOverlay(true)} className="p-2 text-slate-300 hover:text-slate-500 flex flex-col items-center">
               <Sparkles size={24} />
               <span className="text-[9px] font-bold mt-0.5">{t.aiMentorLabel}</span>
            </button>
            <button onClick={() => setCurrentPage('setup')} className="p-2 text-slate-300 hover:text-slate-500"><User size={24}/></button>
        </div>
      )}

      </div>
    </div>
  );
}
