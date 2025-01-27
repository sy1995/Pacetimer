// script.js
let totalTime = 600; // 10 minutes in seconds
let yellowTime = 480; // 8 minutes in seconds
let redTime = 120; // 2 minutes in seconds
let currentTime = totalTime;
let isRunning = false;
let interval;

const timerDisplay = document.getElementById('timerDisplay');
const startPauseBtn = document.getElementById('startPauseBtn');
const totalTimeDisplay = document.getElementById('totalTime');
const yellowTimeDisplay = document.getElementById('yellowTime');
const redTimeDisplay = document.getElementById('redTime');
const editModal = document.getElementById('editModal');
const editMinutes = document.getElementById('editMinutes');
const editSeconds = document.getElementById('editSeconds');
const saveEditBtn = document.getElementById('saveEditBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

let editingType = null; // 当前编辑的时间类型（total, yellow, red）

// 初始化显示
updateDisplay();

// 绑定按钮事件
document.querySelectorAll('.edit-btn').forEach(button => {
  button.addEventListener('click', () => openEditModal(button.dataset.type));
});
document.getElementById('resetBtn').addEventListener('click', resetTimer);
startPauseBtn.addEventListener('click', toggleTimer);
saveEditBtn.addEventListener('click', saveEdit);
cancelEditBtn.addEventListener('click', closeEditModal);

// 打开编辑弹窗
function openEditModal(type) {
  editingType = type;
  const time = getTimeByType(type);
  editMinutes.value = Math.floor(time / 60);
  editSeconds.value = time % 60;
  editModal.style.display = 'flex';
}

// 关闭编辑弹窗
function closeEditModal() {
  editModal.style.display = 'none';
}

// 保存编辑的时间
function saveEdit() {
  const minutes = parseInt(editMinutes.value) || 0;
  const seconds = parseInt(editSeconds.value) || 0;
  const totalSeconds = minutes * 60 + seconds;

  if (editingType === 'total') {
    totalTime = totalSeconds;
  } else if (editingType === 'yellow') {
    yellowTime = totalSeconds;
  } else if (editingType === 'red') {
    redTime = totalSeconds;
  }

  currentTime = totalTime;
  updateDisplay();
  closeEditModal();
}

// 根据类型获取时间
function getTimeByType(type) {
  if (type === 'total') return totalTime;
  if (type === 'yellow') return yellowTime;
  if (type === 'red') return redTime;
  return 0;
}

// 重置计时器
function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  currentTime = totalTime;
  startPauseBtn.textContent = 'Start';
  updateDisplay();
}

// 开始/暂停计时器
function toggleTimer() {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
  } else {
    interval = setInterval(updateTimer, 1000);
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
  }
}

// 更新计时器
function updateTimer() {
  currentTime--;
  updateDisplay();

  // 超时后保持红色背景
  if (currentTime <= 0) {
    document.body.style.backgroundColor = 'red';
  }
}

// 更新显示
function updateDisplay() {
    timerDisplay.textContent = formatTime(currentTime);
    totalTimeDisplay.textContent = formatTime(totalTime);
    yellowTimeDisplay.textContent = formatTime(yellowTime);
    redTimeDisplay.textContent = formatTime(redTime);
  
    // 更新背景颜色
    if (currentTime > yellowTime) {
      document.body.style.backgroundColor = 'green';
    } else if (currentTime > redTime) {
      document.body.style.backgroundColor = '#ffa500'; // 使用新的黄色值
    } else {
      document.body.style.backgroundColor = 'red';
    }
  }

// 格式化时间（MM:SS 或 -MM:SS）
function formatTime(seconds) {
  const isNegative = seconds < 0;
  const absSeconds = Math.abs(seconds);
  const mins = Math.floor(absSeconds / 60);
  const secs = absSeconds % 60;
  return `${isNegative ? '-' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

