class MagicWall {
    constructor() {
        try {
            // 修改基本属性设置为默认值
            this.width = 20;      // 宽度：20
            this.height = 20;     // 高度：20
            this.cellSize = 28;   // 方块大小：28
            this.diffCount = 5;   // 差异数量：5
            this.isChallengeModeActive = true;
            this.currentLevel = 1;
            this.maxUnlockedLevel = 1;
            this.isCustomMode = false;
            this.isMouseTracking = false;
            this.showHints = false;
            this.cheatClickCount = 0;  // 记录提示下的点击次数
            this.isGameRunning = false;
            
            // 添加一个标记来跟踪弹窗状态
            this.isShowingRecords = false;
            // 添加一个标记来跟踪开始提示弹窗状态
            this.isShowingStartAlert = false;
            
            // 默认游戏模式
            this.gameType = 'dynamic'; // 默认动态墙
            this.currentFont = 'Arial'; // 默认字体

            // --- 字母相关配置 ---
            this.alphabetScheme1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            this.alphabetScheme2 = 'abcdefghijklmnopqrstuvwxyz'.split('');
            this.alphabetRules = {};
            this.alphabetScheme1.forEach(c => {
                this.alphabetRules[c] = this.alphabetScheme1.filter(other => other !== c);
            });
            this.alphabetScheme2.forEach(c => {
                this.alphabetRules[c] = this.alphabetScheme2.filter(other => other !== c);
            });

            // --- 汉字相关配置 (完全不同的字) ---
            this.chineseScheme1 = ['天', '地', '人', '和', '金', '木', '水', '火', '土'];
            this.chineseScheme2 = ['春', '夏', '秋', '冬', '风', '花', '雪', '月', '云'];
            this.chineseRules = {};
            this.chineseScheme1.forEach(c => {
                this.chineseRules[c] = this.chineseScheme1.filter(other => other !== c);
            });
            this.chineseScheme2.forEach(c => {
                this.chineseRules[c] = this.chineseScheme2.filter(other => other !== c);
            });

            // --- 麻将相关配置 ---
            this.mahjongScheme1 = ['🀄', '🀅', '🀆', '🀇', '🀈', '🀉', '🀊'];
            this.mahjongScheme2 = ['🀐', '🀑', '🀒', '🀓', '🀔', '🀕', '🀖'];
            this.mahjongRules = {};
            this.mahjongScheme1.forEach(c => {
                this.mahjongRules[c] = this.mahjongScheme1.filter(other => other !== c);
            });
            this.mahjongScheme2.forEach(c => {
                this.mahjongRules[c] = this.mahjongScheme2.filter(other => other !== c);
            });

            // --- Emoji相关配置 ---
            // 表情壅①：表情幺幺 vs 动物大集合（差异大）
            this.emojiScheme1 = ['😀', '😡', '😢', '🤩', '😱', '🥳', '😴'];
            this.emojiScheme2 = ['🐶', '🐱', '🐸', '🐯', '🐼', '🐮', '🐧'];
            this.emojiRules = {};
            this.emojiScheme1.forEach(c => {
                this.emojiRules[c] = this.emojiScheme1.filter(other => other !== c);
            });
            this.emojiScheme2.forEach(c => {
                this.emojiRules[c] = this.emojiScheme2.filter(other => other !== c);
            });

            // 表情壅②：天气/自然 vs 的至金属山。。。实际用 天山/地球 vs 个人对象
            // 实际用：符号/天象 vs 食物类（差异清晰）
            this.emojiScheme3 = ['⭐', '🌙', '☀️', '🌈', '⚡', '🔥', '❤️'];
            this.emojiScheme4 = ['⚽', '🏀', '🎨', '🎮', '🎯', '🏆', '🍿'];
            this.emojiRules2 = {};
            this.emojiScheme3.forEach(c => {
                this.emojiRules2[c] = this.emojiScheme3.filter(other => other !== c);
            });
            this.emojiScheme4.forEach(c => {
                this.emojiRules2[c] = this.emojiScheme4.filter(other => other !== c);
            });

            // --- 颜色相关配置 ---
            this.colorScheme1 = ['Red', 'Yellow', 'Blue', 'LimeGreen', 'Orange', 'White'];
            this.colorScheme2 = ['Red', 'Yellow', 'Blue', 'LimeGreen', 'Orange', 'Black'];
            this.colorRulesSet = {
                'Yellow': ['Red', 'Blue'],
                'White': ['Red', 'Blue'],
                'LimeGreen': ['Red', 'Blue'],
                'Orange': ['Blue'],
                'Red': ['White', 'Yellow', 'LimeGreen', 'Blue'],
                'Blue': ['LimeGreen', 'Yellow', 'White', 'Red', 'Orange']
            };


            // --- 动态墙配色方案（4套，每组6色，各色相间距60°）---
            this.dynamicPalettes = [
                // 方案 A：经典纯色（起始 0°）
                ['#f44336', '#ffeb3b', '#4caf50', '#00e5ff', '#2979ff', '#e040fb'],
                // 方案 B：暖色偏移（起始 20°）
                ['#ff6d00', '#c6ff00', '#00e676', '#00b0ff', '#651fff', '#ff4081'],
                // 方案 C：高饱和霓虹（起始 10°）
                ['#ff3d00', '#ffe500', '#00e676', '#18ffff', '#2962ff', '#aa00ff'],
                // 方案 D：柔和马卡龙（起始 30°）
                ['#ff8f00', '#afb42b', '#00897b', '#0288d1', '#4527a0', '#ad1457'],
            ];
            this.currentDynPaletteIdx = 0;
            this.dynamicScheme = this.dynamicPalettes[0];
            this.dynamicRules = {};
            this.dynamicScheme.forEach(c => {
                this.dynamicRules[c] = this.dynamicScheme.filter(other => other !== c);
            });
            this.dynAnimId = null;
            this.dynStartTime = null;

            this.showEmojiBackground = true; // Emoji墙背景色开关

            // 默认方案与规则（动态墙）
            this.currentColorScheme = this.dynamicScheme;
            this.colorRules = this.dynamicRules;

            // 初始化画布
            this.initCanvas();
            this.setupEventListeners();
            console.log('Game initialized successfully');

            // 初始化音效
            this.sounds = {};
            this.initSounds();

            this.timerInterval = null;
            this.startTime = null;

            // 添加关卡记录数组
            this.levelRecords = Array(20).fill().map(() => ({
                completed: false,
                time: 0,
                errors: 0,
                cheats: 0
            }));

            // 监听窗口大小改变，自动调整画布尺寸
            window.addEventListener('resize', () => {
                if (this.leftPanel && this.rightPanel) {
                    this.initPanels(true);
                }
            });
        } catch (error) {
            console.error('Error initializing game:', error);
            alert(t('alert_init_fail'));
        }
    }

    initCanvas() {
        this.leftPanel = document.getElementById('leftPanel');
        this.rightPanel = document.getElementById('rightPanel');
        
        if (!this.leftPanel || !this.rightPanel) {
            throw new Error('Cannot find game panels');
        }
        
        this.leftCtx = this.leftPanel.getContext('2d');
        this.rightCtx = this.rightPanel.getContext('2d');
        
        if (!this.leftCtx || !this.rightCtx) {
            throw new Error('Cannot get canvas context');
        }

        this.initPanels();
    }

    calculateCellSize() {
        // 自适应窗口大小，预留出菜单栏、边距和统计信息的空间
        const paddingWidth = 80;  // 左右预留空间以及两个面板的间距
        const paddingHeight = 250; // 顶部菜单、统计信息及上下预留空间

        const availableWidth = window.innerWidth - paddingWidth;
        const availableHeight = window.innerHeight - paddingHeight;

        // 因为有两个画布左右排列，所以单个画布的最大宽度是可用宽度的一半
        const panelMaxWidth = availableWidth / 2;

        const maxCellWidth = Math.floor(panelMaxWidth / this.width);
        const maxCellHeight = Math.floor(availableHeight / this.height);

        // 方块大小取宽和高的最小容纳值，并确保最小可见大小
        this.cellSize = Math.max(8, Math.min(maxCellWidth, maxCellHeight));
    }

    initPanels(isResize = false) {
        try {
            this.calculateCellSize();
            // 计算画布尺寸
            const panelWidth = this.width * this.cellSize;
            const panelHeight = this.height * this.cellSize;
            
            // 添加画布大小限制
            const maxCanvasSize = 16384; // 大多数浏览器的最大画布尺寸
            if (panelWidth > maxCanvasSize || panelHeight > maxCanvasSize) {
                throw new Error(t('alert_size_too_large', panelWidth, panelHeight));
            }

            // 计算总内存使用
            const totalPixels = panelWidth * panelHeight;
            const estimatedMemoryMB = (totalPixels * 4 * 2) / (1024 * 1024); // 两个画布，每像素4字节
            if (estimatedMemoryMB > 500) { // 设置500MB的限制
                throw new Error(t('alert_memory_too_large', Math.round(estimatedMemoryMB)));
            }

            console.log('Initializing panels with dimensions:', {
                width: this.width,
                height: this.height,
                cellSize: this.cellSize,
                panelWidth,
                panelHeight,
                estimatedMemoryMB: Math.round(estimatedMemoryMB)
            });

            // 设置画布尺寸
            this.leftPanel.width = panelWidth;
            this.leftPanel.height = panelHeight;
            this.rightPanel.width = panelWidth;
            this.rightPanel.height = panelHeight;

            // 设置画布样式尺寸，确保完全匹配
            this.leftPanel.style.width = `${panelWidth}px`;
            this.leftPanel.style.height = `${panelHeight}px`;
            this.rightPanel.style.width = `${panelWidth}px`;
            this.rightPanel.style.height = `${panelHeight}px`;
            this.leftPanel.style.display = 'block';  // 使用块级显示
            this.rightPanel.style.display = 'block';
            this.leftPanel.style.verticalAlign = 'top';  // 防止底部间隙
            this.rightPanel.style.verticalAlign = 'top';

            // 清空画布
            this.leftCtx.clearRect(0, 0, panelWidth, panelHeight);
            this.rightCtx.clearRect(0, 0, panelWidth, panelHeight);

            // 在游戏开始前绘制初始图案
            if (!this.isGameRunning) {
                if (!this.leftColors) {
                    this.drawInitialPattern();
                } else {
                    this.drawPanels();
                }
            } else {
                if (!isResize) {
                    // 重新生成颜色
                    this.generateColors();
                }
                // 重新绘制面板
                this.drawPanels();
            }

            return true;
        } catch (error) {
            console.error('Error initializing panels:', error);
            alert(error.message || t('alert_init_fail'));
            return false;
        }
    }

    getRandomColor() {
        let color;
        do {
            color = this.currentColorScheme[Math.floor(Math.random() * this.currentColorScheme.length)];
        } while (!this.colorRules[color]); // 确保选中的颜色在规则系统中
        return color;
    }

    generateColors() {
        // 生成左侧面板的颜色
        this.leftColors = Array(this.height).fill().map(() => 
            Array(this.width).fill().map(() => this.getRandomColor())
        );
        
        // 复制左侧面板的颜色到右侧
        this.rightColors = JSON.parse(JSON.stringify(this.leftColors)); // 深拷贝
        
        // 生成差异点
        this.generateDifferences();

        // 动态墙：为每个格子生成随机呼吸频率倍率（0.4x ~ 1.8x），左右同步
        this.dynCellFreqs = Array(this.height).fill().map(() =>
            Array(this.width).fill().map(() => 0.4 + Math.random() * 1.4)
        );
        
        console.log('Colors generated'); // 调试信息
    }
    
    setGameType(type) {
        this.gameType = type;
        const scheme1Ele = document.getElementById('scheme1');
        const isScheme1 = scheme1Ele ? scheme1Ele.checked : true;
        const fontInput = document.getElementById('fontInput');
        
        if (this.gameType === 'color') {
            this.currentColorScheme = isScheme1 ? this.colorScheme1 : this.colorScheme2;
            this.colorRules = this.colorRulesSet;
        } else if (this.gameType === 'alphabet') {
            this.currentColorScheme = isScheme1 ? this.alphabetScheme1 : this.alphabetScheme2;
            this.colorRules = this.alphabetRules;
            this.currentFont = 'Arial';
            if (fontInput) fontInput.value = 'Arial';
        } else if (this.gameType === 'chinese') {
            this.currentColorScheme = isScheme1 ? this.chineseScheme1 : this.chineseScheme2;
            this.colorRules = this.chineseRules;
            this.currentFont = 'KaiTi';
            if (fontInput) fontInput.value = 'KaiTi';
        } else if (this.gameType === 'mahjong') {
            this.currentColorScheme = isScheme1 ? this.mahjongScheme1 : this.mahjongScheme2;
            this.colorRules = this.mahjongRules;
            this.currentFont = 'Arial';
            if (fontInput) fontInput.value = 'Arial';
        } else if (this.gameType === 'emoji') {
            this.currentColorScheme = isScheme1 ? this.emojiScheme1 : this.emojiScheme2;
            this.colorRules = this.emojiRules;
            this.currentFont = 'Arial';
            if (fontInput) fontInput.value = 'Arial';
        } else if (this.gameType === 'emoji2') {
            this.currentColorScheme = isScheme1 ? this.emojiScheme3 : this.emojiScheme4;
            this.colorRules = this.emojiRules2;
            this.currentFont = 'Arial';
            if (fontInput) fontInput.value = 'Arial';
        } else if (this.gameType === 'dynamic') {
            this.currentColorScheme = this.dynamicScheme;
            this.colorRules = this.dynamicRules;
        }
        
        // 当切换模式后主动恢复运行和渲染
        this.stopGame();
        this.initPanels();
        this.startGame();
    }

    setDynPalette(idx) {
        if (!this.dynamicPalettes || idx < 0 || idx >= this.dynamicPalettes.length) return;
        this.currentDynPaletteIdx = idx;
        this.dynamicScheme = this.dynamicPalettes[idx];
        this.dynamicRules = {};
        this.dynamicScheme.forEach(c => {
            this.dynamicRules[c] = this.dynamicScheme.filter(other => other !== c);
        });
        // 如果当前是动态墙则立即切换并重启
        if (this.gameType === 'dynamic') {
            this.currentColorScheme = this.dynamicScheme;
            this.colorRules = this.dynamicRules;
            this.stopGame();
            this.initPanels();
            this.startGame();
        } else {
            // 其他墙（emoji, 字母, 汉字, 麻将等），直接重绘
            if (this.leftColors) {
                this.drawPanels();
            }
        }
    }

    drawPanel(ctx, items) {
        ctx.clearRect(0, 0, this.leftPanel.width, this.leftPanel.height);
        
        if (this.gameType === 'color' || this.gameType === 'dynamic') {
            // 颜色方块渲染（魔方墙 / 动态墙静态帧）
            ctx.fillStyle = this.gameType === 'dynamic' ? '#10101a' : '#000000';
            ctx.fillRect(0, 0, this.width * this.cellSize, this.height * this.cellSize);
            
            // 在背景上绘制颜色方块，留出1像素的间隔
            for(let y = 0; y < this.height; y++) {
                for(let x = 0; x < this.width; x++) {
                    const color = items[y][x];
                    ctx.fillStyle = color;
                    ctx.fillRect(
                        x * this.cellSize + 1, 
                        y * this.cellSize + 1, 
                        this.cellSize - 1,
                        this.cellSize - 1
                    );
                }
            }
        } else {
            // 文字类墙（麻将、Emoji、字母、汉字）
            const bgPalettes = {
                mahjong: [
                    '#c0392b', // 红
                    '#2980b9', // 蓝
                    '#27ae60', // 绿
                    '#8e44ad', // 紫
                    '#d35400', // 橙
                    '#16a085', // 青
                    '#f39c12', // 黄
                ],
                emoji: [
                    '#ff6b6b', // 珊瑚红
                    '#ffa94d', // 橙黄
                    '#ffe066', // 亮黄
                    '#6bcb77', // 草绿
                    '#4d96ff', // 天蓝
                    '#9b59b6', // 紫
                    '#f06595', // 粉
                ],
                emoji2: [
                    '#ff4757', // 亮红
                    '#eccc68', // 金黄
                    '#7bed9f', // 薄荷绿
                    '#70a1ff', // 天蓝
                    '#ff6348', // 珊瑚橙
                    '#a29bfe', // 薰衣草紫
                    '#fd79a8', // 粉玫瑰
                ]
            };

            let paletteKey = null;
            if (this.gameType === 'emoji2') paletteKey = 'emoji2';
            else if (this.gameType === 'emoji') paletteKey = 'emoji';
            else if (this.gameType === 'mahjong') paletteKey = 'mahjong';

            let palette = paletteKey ? bgPalettes[paletteKey] : null;

            // 如果选择了动态配色，应用于所有文字墙
            if (this.dynamicPalettes && this.currentDynPaletteIdx !== undefined) {
                palette = this.dynamicPalettes[this.currentDynPaletteIdx];
            }

            if (palette) {
                // 有配色时，应用色块质感渲染
                const scheme = this.currentColorScheme;
                const charColorMap = {};
                scheme.forEach((ch, i) => {
                    charColorMap[ch] = palette[i % palette.length];
                });

                ctx.fillStyle = '#1a1a2e';
                ctx.fillRect(0, 0, this.width * this.cellSize, this.height * this.cellSize);

                for (let y = 0; y < this.height; y++) {
                    for (let x = 0; x < this.width; x++) {
                        const item = items[y][x];
                        const bgColor = charColorMap[item] || '#555';

                        if (this.showEmojiBackground) {
                            ctx.fillStyle = bgColor;
                            ctx.fillRect(
                                x * this.cellSize + 1,
                                y * this.cellSize + 1,
                                this.cellSize - 2,
                                this.cellSize - 2
                            );
                        }

                        ctx.fillStyle = this.showEmojiBackground ? '#ffffff' : bgColor;
                        if (this.gameType.startsWith('emoji')) {
                            ctx.font = `${this.cellSize * 0.68}px 'Segoe UI Emoji', Arial`;
                        } else {
                            ctx.font = `bold ${this.cellSize * 0.7}px '${this.currentFont}'`;
                        }
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(
                            item,
                            x * this.cellSize + this.cellSize / 2,
                            y * this.cellSize + this.cellSize / 2
                        );
                    }
                }
            } else {
                // 没有配色（字母墙/汉字墙的默认状态），采用白底黑字网格
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, this.width * this.cellSize, this.height * this.cellSize);
                
                for(let y = 0; y < this.height; y++) {
                    for(let x = 0; x < this.width; x++) {
                        const item = items[y][x];
                        
                        ctx.strokeStyle = '#cccccc';
                        ctx.lineWidth = 1;
                        ctx.strokeRect(
                            x * this.cellSize, 
                            y * this.cellSize, 
                            this.cellSize, 
                            this.cellSize
                        );

                        ctx.fillStyle = '#000000';
                        ctx.font = `bold ${this.cellSize * 0.7}px '${this.currentFont}'`;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(
                            item, 
                            x * this.cellSize + this.cellSize / 2, 
                            y * this.cellSize + this.cellSize / 2
                        );
                    }
                }
            }
        }
    }

    drawPanels() {
        // 动态墙模式交给自己的动画循环管理
        if (this.gameType === 'dynamic' && this.isGameRunning) {
            this.startDynamicAnimation();
            return;
        }

        // 清除之前的动画帧请求
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        // 如果游戏未运行且不是初始化阶段，显示初始图案
        if (!this.isGameRunning && this.leftColors === null) {
            this.drawInitialPattern();
            return;
        }
        
        this.drawPanel(this.leftCtx, this.leftColors);
        this.drawPanel(this.rightCtx, this.rightColors);
        
        // 如果开启提示，绘制提示
        if (this.showHints && this.diffPoints) {
            this.drawHints();
        }
        
        // 如果开启了鼠标跟踪，重新绘制最后的鼠标位置
        if (this.isMouseTracking && this.lastMousePos) {
            this.drawMouseTracker(this.lastMousePos.x, this.lastMousePos.y);
        }
    }

    startDynamicAnimation() {
        // 避免重复启动
        if (this.dynAnimId) return;
        if (!this.dynStartTime) this.dynStartTime = performance.now();

        const loop = (now) => {
            // 有 leftColors 且是动态墙模式就持续运行
            if (this.gameType !== 'dynamic' || !this.leftColors) {
                this.dynAnimId = null;
                return;
            }
            const t = (now - this.dynStartTime) / 1000;
            this._drawDynamicPanel(this.leftCtx, this.leftColors, t, false);
            this._drawDynamicPanel(this.rightCtx, this.rightColors, t, true);

            if (this.showHints && this.diffPoints) this.drawHints();
            if (this.isMouseTracking && this.lastMousePos)
                this.drawMouseTracker(this.lastMousePos.x, this.lastMousePos.y);

            this.dynAnimId = requestAnimationFrame(loop);
        };
        this.dynAnimId = requestAnimationFrame(loop);
    }

    stopDynamicAnimation() {
        if (this.dynAnimId) {
            cancelAnimationFrame(this.dynAnimId);
            this.dynAnimId = null;
        }
        this.dynStartTime = null;
    }

    _drawDynamicPanel(ctx, items, t, isRightPanel) {
        if (!items) return;
        const cs = this.cellSize;
        ctx.clearRect(0, 0, this.leftPanel.width, this.leftPanel.height);

        ctx.fillStyle = '#111122';
        ctx.fillRect(0, 0, this.width * cs, this.height * cs);

        const freqs = this.dynCellFreqs;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const color = items[y][x];
                const key = `${x},${y}`;
                const isTraitor = isRightPanel && this.diffPoints && this.diffPoints.has(key);

                const px = x * cs + 1;
                const py = y * cs + 1;
                const pw = cs - 2;

                // ① 完全不透明的彩色方块
                ctx.globalAlpha = 1.0;
                ctx.fillStyle = color;
                ctx.fillRect(px, py, pw, pw);

                // ② 每个格子用自己的随机频率呼吸，左右同步
                //    叛徒格子：相同随机频率，但加 π 反相
                const freq = freqs && freqs[y] ? freqs[y][x] : 1.0;
                const phase = isTraitor ? Math.PI : 0;
                const pulse = 0.28 * Math.max(0, Math.sin(t * 2.0 * freq + phase));

                if (pulse > 0.002) {
                    ctx.globalAlpha = pulse;
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(px, py, pw, pw);
                }

                ctx.globalAlpha = 1.0;
            }
        }
    }

    setupEventListeners() {
        // 移除所有旧的事件监听器
        this.leftPanel.removeEventListener('click', this._handleLeftClick);
        this.rightPanel.removeEventListener('click', this._handleRightClick);
        this.leftPanel.removeEventListener('mousemove', this._handleLeftMouseMove);
        this.rightPanel.removeEventListener('mousemove', this._handleRightMouseMove);

        // 创建绑定到实例的事件处理函数
        this._handleLeftClick = (e) => this.handleClick(e, 'left');
        this._handleRightClick = (e) => this.handleClick(e, 'right');
        this._handleLeftMouseMove = (e) => this.handleMouseMove(e, 'left');
        this._handleRightMouseMove = (e) => this.handleMouseMove(e, 'right');
        
        // 添加新的事件监听器
        this.leftPanel.addEventListener('click', this._handleLeftClick);
        this.rightPanel.addEventListener('click', this._handleRightClick);
        this.leftPanel.addEventListener('mousemove', this._handleLeftMouseMove);
        this.rightPanel.addEventListener('mousemove', this._handleRightMouseMove);
    }

    startGame() {
        // 重置游戏状态
        this.isGameRunning = false;
        this.resetStats();
        this.cheatClickCount = 0;
        // 确保提示功能关闭
        this.showHints = false;
        // 重置提示按钮状态
        const hintsCheckbox = document.querySelector('input[type="checkbox"][onclick*="setHints"]');
        if (hintsCheckbox) {
            hintsCheckbox.checked = false;
        }
        
        // 生成新的颜色和差异点
        this.generateColors();
        
        // 绘制面板
        this.drawPanels();

        // 动态墙模式：立即启动动画（不等待 isGameRunning）
        if (this.gameType === 'dynamic') {
            this.stopDynamicAnimation();
            this.startDynamicAnimation();
        }
        
        console.log('Game started');
        this.playSound('start');
        
        // 根据当前模式直接开始游戏
        if (this.isChallengeModeActive) {
            // 直接开始，不弹确认窗口
            this.startTimer();
            this.isGameRunning = true;
        } else if (this.isCustomMode) {
            this.startTimer();
            this.isGameRunning = true;
        }
    }

    stopGame() {
        this.isGameRunning = false;
        this.stopTimer();
        this.stopDynamicAnimation();
        this.isShowingStartAlert = false;
        
        // 清空游戏数据
        this.leftColors = null;
        this.rightColors = null;
        this.diffPoints = null;
        
        // 重置统计信息
        document.getElementById('errorCount').textContent = '0';
        document.getElementById('foundCount').textContent = '0';
        document.getElementById('timer').textContent = '00:00:00';
        
        const blockCountEl = document.getElementById('blockCount');
        if (blockCountEl) {
            const total = this.width * this.height * 2;
            blockCountEl.textContent = `${this.width}x${this.height}x2=${total}`;
        }
        
        // 重新初始化面板，显示初始图案
        this.initPanels();
        
        console.log('Game stopped');

        // 只在有完成记录且未显示记录时才显示闯关记录
        if (this.isChallengeModeActive && 
            this.levelRecords.some(record => record.completed) &&
            !this.isShowingRecords) {
            this.isShowingRecords = true;
            this.showChallengeRecords();
        }
    }

    resetStats() {
        document.getElementById('errorCount').textContent = '0';
        document.getElementById('foundCount').textContent = `0/${this.diffCount}`;
        document.getElementById('timer').textContent = '0.000';
        
        const blockCountEl = document.getElementById('blockCount');
        if (blockCountEl) {
            const total = this.width * this.height * 2;
            blockCountEl.textContent = `${this.width}x${this.height}x2=${total}`;
        }

        this.stopTimer(); // 确保重置时停止已有的计时器
    }

    handleClick(e, side) {
        if (!this.isGameRunning) return;
        
        const rect = e.target.getBoundingClientRect();
        const scaleX = this.rightPanel.width / rect.width;
        const scaleY = this.rightPanel.height / rect.height;
        
        const x = Math.floor(((e.clientX - rect.left) * scaleX) / this.cellSize);
        const y = Math.floor(((e.clientY - rect.top) * scaleY) / this.cellSize);
        
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;

        const key = `${x},${y}`;
        if (this.diffPoints && this.diffPoints.has(key)) {
            // 只在提示开启时记录点击
            if (this.showHints) {
                this.cheatClickCount++;
            }
            
            this.playSound('correct');
            console.log('Found difference point!');
            
            // 更新颜色和状态
            this.rightColors[y][x] = this.leftColors[y][x];
            this.diffPoints.delete(key);
            
            const foundCount = this.diffCount - this.diffPoints.size;
            document.getElementById('foundCount').textContent = `${foundCount}/${this.diffCount}`;
            
            // 在两边同时播放特效
            this.createParticles(x, y, this.leftCtx);
            this.createParticles(x, y, this.rightCtx);
            
            // 延迟重绘面板，让特效有时间显示
            setTimeout(() => {
                this.drawPanels();
                
                if (this.diffPoints.size === 0) {
                    setTimeout(() => {
                        this.playSound('complete');
                        this.gameComplete();
                    }, 500);
                }
            }, 500);
            
        } else {
            this.playSound('wrong');
            console.log('Missed difference point');
            const errorCount = parseInt(document.getElementById('errorCount').textContent) + 1;
            document.getElementById('errorCount').textContent = errorCount;
            
            // 点错时也在两边显示特效，但使用不同的颜色
            this.createErrorParticles(x, y, this.leftCtx);
            this.createErrorParticles(x, y, this.rightCtx);
        }
    }

    startTimer() {
        // 清除已有的计时器
        this.stopTimer();
        
        // 记录开始时间
        this.startTime = Date.now();
        
        // 设置计时器
        this.timerInterval = setInterval(() => {
            const currentTime = Date.now();
            const elapsedTime = (currentTime - this.startTime) / 1000;
            document.getElementById('timer').textContent = elapsedTime.toFixed(3);
        }, 50); // 更新频率更高，以显示毫秒
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.startTime = null;
    }

    gameComplete() {
        if (this.isChallengeModeActive) {
            // 先停止计时
            this.stopTimer();
            this.completeLevel();
        } else {
            // 先更新最后的计数和时间
            document.getElementById('foundCount').textContent = `${this.diffCount}/${this.diffCount}`;
            const totalTime = document.getElementById('timer').textContent;
            const errorCount = document.getElementById('errorCount').textContent;
            
            // 停止游戏和计时器
            this.stopTimer();
            this.stopGame();
            
            // 显示完成提示
            let message;
            if (this.cheatClickCount > 0) {
                message = t('game_over_cheat', this.diffCount, this.cheatClickCount, totalTime);
            } else {
                message = t('game_over_success', this.diffCount, errorCount, totalTime);
            }
            
            setTimeout(() => {
                this.showCustomAlert(message);
            }, 50);
        }
    }

    generateDifferences() {
        let diffPoints = new Set();
        let attempts = 0;
        const maxAttempts = this.width * this.height * 2; // 防止无限循环
        
        while (diffPoints.size < this.diffCount && attempts < maxAttempts) {
            attempts++;
            const x = Math.floor(Math.random() * this.width);
            const y = Math.floor(Math.random() * this.height);
            const key = `${x},${y}`;
            
            if (!diffPoints.has(key)) {
                const currentColor = this.leftColors[y][x];
                const allowedColors = this.colorRules[currentColor];
                
                if (allowedColors && allowedColors.length > 0) {
                    const newColor = allowedColors[Math.floor(Math.random() * allowedColors.length)];
                    if (newColor !== currentColor) {
                        diffPoints.add(key);
                        this.rightColors[y][x] = newColor;
                        console.log(`Created diff point at ${x},${y}: ${currentColor} -> ${newColor}`);
                    }
                }
            }
        }
        
        this.diffPoints = diffPoints;
        console.log(`Generated ${this.diffPoints.size} difference points:`, Array.from(this.diffPoints));
    }

    isValidColorChange(fromColor, toColor) {
        const allowedColors = this.colorRules[fromColor];
        return allowedColors && allowedColors.includes(toColor);
    }

    handleMouseMove(e, side) {
        if (!this.isGameRunning || !this.isMouseTracking) return;
        
        const rect = e.target.getBoundingClientRect();
        const scaleX = this.rightPanel.width / rect.width;
        const scaleY = this.rightPanel.height / rect.height;
        
        const x = Math.floor(((e.clientX - rect.left) * scaleX) / this.cellSize);
        const y = Math.floor(((e.clientY - rect.top) * scaleY) / this.cellSize);
        
        // 边界检查
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
        
        // 保存最后的鼠标位置
        this.lastMousePos = { x, y };
        
        // 重新绘制面板
        this.drawPanels();
        this.drawMouseTracker(x, y);
    }

    drawCrossHair(x, y, ctx) {
        // 绘制半透明的十字线
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1;
        
        // 使用虚线
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        // 垂直线
        ctx.moveTo(x * this.cellSize + this.cellSize/2, 0);
        ctx.lineTo(x * this.cellSize + this.cellSize/2, this.rightPanel.height);
        
        // 水平线
        ctx.moveTo(0, y * this.cellSize + this.cellSize/2);
        ctx.lineTo(this.rightPanel.width, y * this.cellSize + this.cellSize/2);
        
        ctx.stroke();
        
        // 重置虚线设置
        ctx.setLineDash([]);
    }

    drawHighlightBox(x, y, ctx) {
        // 绘制当前方块的高亮边框
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 2;
        
        // 绘制高亮边框
        ctx.strokeRect(
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellSize
        );
        
        // 添加内部阴影效果
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(
            x * this.cellSize + 1,
            y * this.cellSize + 1,
            this.cellSize - 2,
            this.cellSize - 2
        );
    }

    drawHints() {
        this.rightCtx.save();
        this.leftCtx.save();
        
        // 获取当前时间用于动画
        const time = performance.now() / 1000;
        
        Array.from(this.diffPoints).forEach(pointStr => {
            const [x, y] = pointStr.split(',').map(Number);
            const pixelX = x * this.cellSize;
            const pixelY = y * this.cellSize;
            
            // 设置更粗的边框
            const borderWidth = 6;
            const borderAlpha = (Math.sin(time * 5) + 1) / 2; // 0到1之间闪烁
            
            // 统一使用红色闪烁边框，在白底上更显眼
            const strokeStyle = `rgba(255, 0, 0, ${Math.min(0.9, borderAlpha + 0.3)})`;
            
            // 左边画布 - 同步显眼提示
            this.leftCtx.strokeStyle = strokeStyle;
            this.leftCtx.lineWidth = borderWidth;
            this.leftCtx.strokeRect(
                pixelX - borderWidth/2,
                pixelY - borderWidth/2,
                this.cellSize + borderWidth,
                this.cellSize + borderWidth
            );
            
            // 右边画布 - 同步显眼提示
            this.rightCtx.strokeStyle = strokeStyle;
            this.rightCtx.lineWidth = borderWidth;
            this.rightCtx.strokeRect(
                pixelX - borderWidth/2,
                pixelY - borderWidth/2,
                this.cellSize + borderWidth,
                this.cellSize + borderWidth
            );
        });
        
        this.rightCtx.restore();
        this.leftCtx.restore();
        
        // 请求下一帧动画
        if (this.showHints) {
            this.animationFrameId = requestAnimationFrame(() => this.drawPanels());
        }
    }

    initChallengeMode() {
        this.challengeLevels = [
            { width: 10, height: 10, diffCount: 3 },
            { width: 15, height: 15, diffCount: 5 },
            { width: 20, height: 20, diffCount: 7 },
            { width: 25, height: 25, diffCount: 10 },
            { width: 30, height: 30, diffCount: 15 },
            { width: 40, height: 40, diffCount: 20 }
        ];
        this.currentLevel = 0;
    }

    startChallengeMode() {
        if (!this.challengeLevels) {
            this.initChallengeMode();
        }
        const level = this.challengeLevels[this.currentLevel];
        this.width = level.width;
        this.height = level.height;
        this.diffCount = level.diffCount;
        this.initPanels();
        this.startGame();
        
        // 更新关卡信息
        document.getElementById('currentLevel').textContent = this.currentLevel + 1;
        document.getElementById('challengeModeDialog').style.display = 'flex';
    }

    saveGame() {
        const gameState = {
            leftColors: this.leftColors,
            rightColors: this.rightColors,
            diffPoints: Array.from(this.diffPoints),
            stats: {
                errorCount: document.getElementById('errorCount').textContent,
                foundCount: document.getElementById('foundCount').textContent,
                timer: document.getElementById('timer').textContent
            },
            settings: {
                width: this.width,
                height: this.height,
                diffCount: this.diffCount,
                isCustomMode: this.isCustomMode,
                currentLevel: this.currentLevel,
                colorScheme: this.currentColorScheme === this.colorScheme2
            }
        };
        
        try {
            localStorage.setItem('magicWallSave', JSON.stringify(gameState));
            alert(t('alert_save_success'));
        } catch (error) {
            console.error('保存游戏失败:', error);
            alert(t('alert_save_fail'));
        }
    }

    loadGame() {
        try {
            const savedState = localStorage.getItem('magicWallSave');
            if (savedState) {
                const gameState = JSON.parse(savedState);
                
                // 恢复设置
                this.width = gameState.settings.width;
                this.height = gameState.settings.height;
                this.diffCount = gameState.settings.diffCount;
                this.isCustomMode = gameState.settings.isCustomMode;
                this.currentLevel = gameState.settings.currentLevel;
                this.currentColorScheme = gameState.settings.colorScheme ? 
                    this.colorScheme2 : this.colorScheme1;
                
                // 初始化面板
                this.initPanels();
                
                // 恢复颜色数据
                this.leftColors = gameState.leftColors;
                this.rightColors = gameState.rightColors;
                this.diffPoints = new Set(gameState.diffPoints);
                
                // 恢复统计信息
                document.getElementById('errorCount').textContent = gameState.stats.errorCount;
                document.getElementById('foundCount').textContent = gameState.stats.foundCount;
                document.getElementById('timer').textContent = gameState.stats.timer;
                
                // 重绘面板
                this.drawPanels();
                this.isGameRunning = true;
                this.startTimer();
                
                alert(t('alert_load_success'));
            } else {
                alert(t('alert_load_fail_no_save'));
            }
        } catch (error) {
            console.error('加载游戏失败:', error);
            alert(t('alert_load_fail'));
        }
    }

    applyCustomMode() {
        const width = parseInt(document.getElementById('widthInput').value);
        const height = parseInt(document.getElementById('heightInput').value);
        const cellSize = parseInt(document.getElementById('cellSizeInput').value);
        const diffCount = parseInt(document.getElementById('diffCountInput').value);
        const fontInput = document.getElementById('fontInput');
        const selectedFont = fontInput ? fontInput.value : 'Arial';
        const isScheme1 = document.getElementById('scheme1').checked;

        // 添加更严格的验证
        const totalCells = width * height;
        if (totalCells > 40000) { // 限制总方块数
            alert(t('val_total_cells'));
            return;
        }

        const panelSize = width * cellSize;
        if (panelSize > 16384) { // 浏览器画布尺寸限制
            alert(t('val_canvas_size'));
            return;
        }

        console.log('Applying custom mode settings:', {
            width,
            height,
            cellSize,
            diffCount,
            isScheme1
        });

        // 修改验证输入的限制
        if (width < 10 || width > 200 || height < 10 || height > 200) {
            alert(t('val_dimension'));
            return;
        }

        if (cellSize < 5 || cellSize > 50) {
            alert(t('val_cell_size'));
            return;
        }

        // 修改差异点数量的验证，防止数量过大导致性能问题
        const maxDiffPoints = Math.min(width * height, 1000); // 限制最大差异点数为1000
        if (diffCount < 1 || diffCount > maxDiffPoints) {
            alert(t('val_diff_count', maxDiffPoints));
            return;
        }

        // 更新游戏设置
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.diffCount = diffCount;
        this.currentFont = selectedFont;
        if (this.gameType === 'color') {
            this.currentColorScheme = isScheme1 ? this.colorScheme1 : this.colorScheme2;
            this.colorRules = this.colorRulesSet;
        } else if (this.gameType === 'alphabet') {
            this.currentColorScheme = isScheme1 ? this.alphabetScheme1 : this.alphabetScheme2;
            this.colorRules = this.alphabetRules;
        } else if (this.gameType === 'chinese') {
            this.currentColorScheme = isScheme1 ? this.chineseScheme1 : this.chineseScheme2;
            this.colorRules = this.chineseRules;
        } else if (this.gameType === 'mahjong') {
            this.currentColorScheme = isScheme1 ? this.mahjongScheme1 : this.mahjongScheme2;
            this.colorRules = this.mahjongRules;
        } else if (this.gameType === 'emoji') {
            this.currentColorScheme = isScheme1 ? this.emojiScheme1 : this.emojiScheme2;
            this.colorRules = this.emojiRules;
        } else if (this.gameType === 'dynamic') {
            this.currentColorScheme = this.dynamicScheme;
            this.colorRules = this.dynamicRules;
        }
        
        // 初始化面板
        if (this.initPanels()) {
            document.getElementById('customModeDialog').style.display = 'none';
            this.startGame();
        }
    }

    // 添加自定义弹窗函数
    showCustomAlert(message, callback = null) {
        // 如果游戏正在运行，暂停计时
        const wasRunning = this.isGameRunning;
        if (wasRunning) {
            this.stopTimer();
        }

        const alertDiv = document.createElement('div');
        alertDiv.className = 'custom-alert';
        alertDiv.innerHTML = `
            <div class="custom-alert-content">
                <p>${message}</p>
                <button>OK</button>
            </div>
        `;

        // 修改按钮点击事件
        alertDiv.querySelector('button').onclick = () => {
            alertDiv.remove();
            // 如果游戏之前在运行，并且不是游戏结束的弹窗，恢复计时
            if (wasRunning && !message.includes('恭喜完成') && !message.includes('作弊')) {
                this.startTimer();
            }
            if (callback) callback(); // 如果有回调函数就执行
        };
        document.getElementById('gameArea').appendChild(alertDiv);
    }

    // 添加绘制初始图案的方法
    drawInitialPattern() {
        // 随机选择一个图案
        const patterns = [this.drawHexagonPattern, this.drawCirclePattern, 
                         this.drawSquarePattern, this.drawStarPattern];
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        randomPattern.call(this);
    }

    // 1. 六边形蜂窝图案
    drawHexagonPattern() {
        const colors = [
            'rgba(147, 112, 219, 0.8)',  // 浅紫色
            'rgba(138, 43, 226, 0.8)',   // 紫罗兰
            'rgba(106, 90, 205, 0.9)',   // 深紫色
            'rgba(153, 50, 204, 0.8)',   // 深兰花紫
            'rgba(186, 85, 211, 0.8)'    // 中兰花紫
        ];

        const centerX = (this.width * this.cellSize) / 2;
        const centerY = (this.height * this.cellSize) / 2;

        [this.leftCtx, this.rightCtx].forEach(ctx => {
            ctx.save();
            
            // 设置背景
            ctx.fillStyle = 'rgba(28, 27, 34, 1)';
            ctx.fillRect(0, 0, this.width * this.cellSize, this.height * this.cellSize);

            // 六边形参数
            const hexSize = this.cellSize * 2;
            const hexHeight = hexSize * Math.sqrt(3);
            const hexWidth = hexSize * 2;
            const hexVertical = hexHeight * 0.75;

            // 绘制六边形网格
            for (let row = -2; row < this.height + 2; row++) {
                for (let col = -2; col < this.width + 2; col++) {
                    const x = col * hexWidth * 0.75;
                    const y = row * hexVertical;
                    const offset = (row % 2) * (hexWidth * 0.375);

                    // 计算到中心的距离
                    const dx = x + offset - centerX;
                    const dy = y - centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // 创建渐变
                    const gradient = ctx.createRadialGradient(
                        x + offset, y, 0,
                        x + offset, y, hexSize
                    );

                    const colorIndex = Math.floor((distance / (hexSize * 2)) % colors.length);
                    const nextColorIndex = (colorIndex + 1) % colors.length;

                    gradient.addColorStop(0, colors[colorIndex]);
                    gradient.addColorStop(1, colors[nextColorIndex]);

                    // 绘制六边形
                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        const angle = (i * Math.PI) / 3;
                        const xPos = x + offset + hexSize * Math.cos(angle);
                        const yPos = y + hexSize * Math.sin(angle);
                        if (i === 0) {
                            ctx.moveTo(xPos, yPos);
                        } else {
                            ctx.lineTo(xPos, yPos);
                        }
                    }
                    ctx.closePath();
                    ctx.fillStyle = gradient;
                    ctx.fill();

                    // 添加发光效果
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            // 添加中心光晕效果
            const centerGradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, this.cellSize * 10
            );
            centerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
            centerGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
            centerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = centerGradient;
            ctx.fillRect(0, 0, this.width * this.cellSize, this.height * this.cellSize);

            // 添加文字和装饰
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = 'bold 28px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // 绘制主标题
            let titleText = t('text_eng_wall');
            if (this.gameType === 'chinese') titleText = t('text_chn_wall');
            else if (this.gameType === 'color') titleText = t('text_color_wall');
            else if (this.gameType === 'mahjong') titleText = t('text_mahjong_wall');
            else if (this.gameType === 'emoji') titleText = t('text_emoji_wall');
            else if (this.gameType === 'emoji2') titleText = t('text_emoji2_wall');
            else if (this.gameType === 'dynamic') titleText = t('text_dynamic_wall');
            ctx.fillText(titleText, centerX, centerY - 20);
            
            // 绘制副标题
            ctx.font = 'bold 24px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.fillText(t('text_lab'), centerX, centerY + 30);

            // 添加装饰线条
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX - 150, centerY - 50);
            ctx.lineTo(centerX + 150, centerY - 50);
            ctx.moveTo(centerX - 150, centerY + 60);
            ctx.lineTo(centerX + 150, centerY + 60);
            ctx.stroke();

            ctx.restore();
        });
    }

    // 2. 同心圆图案
    drawCirclePattern() {
        const colors = [
            'rgba(75, 0, 130, 0.8)',     // 靛蓝
            'rgba(147, 112, 219, 0.8)',  // 浅紫色
            'rgba(138, 43, 226, 0.8)',   // 紫罗兰
            'rgba(106, 90, 205, 0.9)',   // 深紫色
            'rgba(153, 50, 204, 0.8)'    // 深兰花紫
        ];

        const centerX = (this.width * this.cellSize) / 2;
        const centerY = (this.height * this.cellSize) / 2;

        [this.leftCtx, this.rightCtx].forEach(ctx => {
            ctx.save();
            
            // 设置背景
            ctx.fillStyle = 'rgba(28, 27, 34, 1)';
            ctx.fillRect(0, 0, this.width * this.cellSize, this.height * this.cellSize);

            // 绘制同心圆
            const maxRadius = Math.max(centerX, centerY) * 1.5;
            for (let radius = maxRadius; radius > 0; radius -= this.cellSize) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                const colorIndex = Math.floor((radius / this.cellSize) % colors.length);
                ctx.fillStyle = colors[colorIndex];
                ctx.fill();
            }

            // 添加发光效果
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, maxRadius
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, this.width * this.cellSize, this.height * this.cellSize);

            this.drawText(ctx, centerX, centerY);
            ctx.restore();
        });
    }

    // 3. 方形螺旋图案
    drawSquarePattern() {
        const colors = [
            'rgba(147, 112, 219, 0.8)',  // 浅紫色
            'rgba(138, 43, 226, 0.8)',   // 紫罗兰
            'rgba(106, 90, 205, 0.9)',   // 深紫色
            'rgba(153, 50, 204, 0.8)',   // 深兰花紫
            'rgba(186, 85, 211, 0.8)'    // 中兰花紫
        ];

        const centerX = (this.width * this.cellSize) / 2;
        const centerY = (this.height * this.cellSize) / 2;

        [this.leftCtx, this.rightCtx].forEach(ctx => {
            ctx.save();
            
            // 设置背景
            ctx.fillStyle = 'rgba(28, 27, 34, 1)';
            ctx.fillRect(0, 0, this.width * this.cellSize, this.height * this.cellSize);

            // 绘制方形螺旋
            const size = Math.min(this.width, this.height) * this.cellSize / 2;
            for (let i = size; i > 0; i -= this.cellSize) {
                ctx.beginPath();
                ctx.rect(centerX - i, centerY - i, i * 2, i * 2);
                const colorIndex = Math.floor((i / this.cellSize) % colors.length);
                ctx.fillStyle = colors[colorIndex];
                ctx.fill();
                
                // 旋转方形
                ctx.translate(centerX, centerY);
                ctx.rotate(Math.PI / 32);
                ctx.translate(-centerX, -centerY);
            }

            this.drawText(ctx, centerX, centerY);
            ctx.restore();
        });
    }

    // 4. 星形图案
    drawStarPattern() {
        const colors = [
            'rgba(147, 112, 219, 0.8)',  // 浅紫色
            'rgba(138, 43, 226, 0.8)',   // 紫罗兰
            'rgba(106, 90, 205, 0.9)',   // 深紫色
            'rgba(153, 50, 204, 0.8)',   // 深兰花紫
            'rgba(186, 85, 211, 0.8)'    // 中兰花紫
        ];

        const centerX = (this.width * this.cellSize) / 2;
        const centerY = (this.height * this.cellSize) / 2;

        [this.leftCtx, this.rightCtx].forEach(ctx => {
            ctx.save();
            
            // 设置背景
            ctx.fillStyle = 'rgba(28, 27, 34, 1)';
            ctx.fillRect(0, 0, this.width * this.cellSize, this.height * this.cellSize);

            // 绘制多层星形
            const maxRadius = Math.max(centerX, centerY);
            for (let radius = maxRadius; radius > 0; radius -= this.cellSize * 2) {
                this.drawStar(ctx, centerX, centerY, 8, radius, radius/2, 
                             colors[Math.floor((radius / this.cellSize) % colors.length)]);
            }

            // 添加发光效果
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, maxRadius
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, this.width * this.cellSize, this.height * this.cellSize);

            this.drawText(ctx, centerX, centerY);
            ctx.restore();
        });
    }

    // 辅助方法：绘制星形
    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI * i) / spikes;
            ctx.lineTo(cx + Math.sin(angle) * radius, cy - Math.cos(angle) * radius);
        }
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }

    // 辅助方法：绘制文字
    drawText(ctx, centerX, centerY) {
        // 添加文字和装饰
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // 绘制主标题
        ctx.fillText('英文字母墙找茬', centerX, centerY - 20);
        
        // 绘制副标题
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillText('AIGC_3D视觉实验室', centerX, centerY + 30);

        // 添加装饰线条
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - 150, centerY - 50);
        ctx.lineTo(centerX + 150, centerY - 50);
        ctx.moveTo(centerX - 150, centerY + 60);
        ctx.lineTo(centerX + 150, centerY + 60);
        ctx.stroke();
    }

    // 添加散花特效方法
    createParticles(x, y, ctx) {
        const particles = [];
        const rings = [];
        const particleCount = 40; // 增加粒子数量
        const colors = [
            'rgba(255, 255, 255, 0.9)',  // 白色
            'rgba(147, 112, 219, 0.9)',  // 浅紫色
            'rgba(138, 43, 226, 0.9)',   // 紫罗兰
            'rgba(106, 90, 205, 0.9)',   // 深紫色
            'rgba(186, 85, 211, 0.9)'    // 中兰花紫
        ];

        // 创建爆炸粒子
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 3 + Math.random() * 3; // 增加速度
            particles.push({
                x: x * this.cellSize + this.cellSize / 2,
                y: y * this.cellSize + this.cellSize / 2,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 4 + Math.random() * 4,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2
            });
        }

        // 创建扩散环
        for (let i = 0; i < 3; i++) {
            rings.push({
                x: x * this.cellSize + this.cellSize / 2,
                y: y * this.cellSize + this.cellSize / 2,
                radius: 0,
                life: 1,
                maxRadius: 50 + i * 20,
                speed: 2 + i * 0.5
            });
        }

        // 保存原始画布内容
        const originalCanvas = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

        // 动画函数
        const animate = () => {
            // 恢复原始画布内容
            ctx.putImageData(originalCanvas, 0, 0);
            
            // 绘制扩散环
            rings.forEach((ring, index) => {
                if (ring.life > 0) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${ring.life * 0.5})`;
                    ctx.lineWidth = 2;
                    ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
                    ctx.stroke();

                    // 更新环
                    ring.radius += ring.speed;
                    ring.life -= ring.radius / (ring.maxRadius * 2);
                }
            });

            // 更新和绘制粒子
            particles.forEach((particle, index) => {
                // 更新位置
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.98; // 添加阻力
                particle.vy *= 0.98;
                particle.rotation += particle.rotationSpeed;
                particle.life -= 0.02;

                // 如果粒子还活着就绘制
                if (particle.life > 0) {
                    ctx.save();
                    ctx.translate(particle.x, particle.y);
                    ctx.rotate(particle.rotation);
                    
                    // 绘制星形粒子
                    ctx.beginPath();
                    const points = 4;
                    for (let i = 0; i < points * 2; i++) {
                        const radius = i % 2 === 0 ? particle.size : particle.size / 2;
                        const angle = (Math.PI * i) / points;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        if (i === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.closePath();
                    
                    // 创建渐变填充
                    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
                    gradient.addColorStop(0, particle.color.replace('0.9', '1'));
                    gradient.addColorStop(1, particle.color.replace('0.9', '0'));
                    ctx.fillStyle = gradient;
                    ctx.fill();
                    
                    // 添加发光效果
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = particle.color;
                    
                    ctx.restore();
                }
            });

            // 如果还有活跃的粒子或环，继续动画
            if (particles.some(p => p.life > 0) || rings.some(r => r.life > 0)) {
                requestAnimationFrame(animate);
            } else {
                // 动画结束后重绘面板
                this.drawPanels();
            }
        };

        // 开始动画
        animate();
    }

    // 添加错误特效方法
    createErrorParticles(x, y, ctx) {
        // 复制原有的createParticles方法，但使用红色系的颜色
        const particles = [];
        const rings = [];
        const particleCount = 40;
        const colors = [
            'rgba(255, 0, 0, 0.9)',    // 红色
            'rgba(255, 69, 0, 0.9)',   // 红橙色
            'rgba(255, 99, 71, 0.9)',  // 番茄红
            'rgba(220, 20, 60, 0.9)',  // 猩红色
            'rgba(178, 34, 34, 0.9)'   // 深红色
        ];

        // ... 其余代码与createParticles相同，只是使用新的颜色数组 ...
        // 复制createParticles方法的其余部分，保持逻辑不变
    }

    // 添加播放音效的方法
    playSound(soundName) {
        try {
            const sound = this.sounds[soundName];
            if (sound) {
                // 读取原始音频源的URL
                const src = sound.querySelector('source') ? sound.querySelector('source').src : sound.src;
                if (!src) return;

                // 创建全新的Audio实例以支持重叠播放（例如快速连续点击）
                const soundClone = new Audio(src);
                soundClone.volume = sound.volume || 0.5;
                
                // 尝试播放
                const playPromise = soundClone.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            // 播放完毕后解除引用供垃圾回收
                            soundClone.onended = () => {
                                soundClone.src = '';
                            };
                        })
                        .catch(error => {
                            console.error(`Error playing ${soundName}:`, error);
                            // 浏览器自动播放限制，等待用户下一次交互再播放
                            const retryPlay = () => {
                                const retryClone = new Audio(src);
                                retryClone.volume = sound.volume || 0.5;
                                retryClone.play().catch(e => console.error('Retry failed:', e));
                                document.removeEventListener('click', retryPlay);
                            };
                            document.addEventListener('click', retryPlay);
                        });
                }
            }
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    }

    // 添加音效初始化方法
    initSounds() {
        // 使用 HTML 中定义的音频元素
        this.sounds = {
            correct: document.getElementById('correctSound'),
            wrong: document.getElementById('wrongSound'),
            start: document.getElementById('startSound'),
            complete: document.getElementById('completeSound')
        };

        // 为每个音频添加事件监听器
        Object.entries(this.sounds).forEach(([name, audio]) => {
            if (audio) {
                // 设置音量
                audio.volume = 0.5;

                // 添加加载事件监听
                audio.addEventListener('loadeddata', () => {
                    console.log(`Sound ${name} loaded successfully`);
                });

                // 添加错误处理
                audio.addEventListener('error', (e) => {
                    console.error(`Error loading sound ${name}:`, e);
                });

                // 预加载
                audio.load();
            } else {
                console.error(`Audio element ${name} not found`);
            }
        });
    }

    // 更新闯关模式方法
    startChallengeLevel() {
        const currentLevel = CHALLENGE_LEVELS[this.currentLevel - 1];
        
        // 设置游戏参数
        this.width = currentLevel.width;
        this.height = currentLevel.height;
        this.cellSize = currentLevel.cellSize;
        this.diffCount = currentLevel.diffCount;
        this.timeRemaining = currentLevel.timeLimit;
        this.cheatClickCount = 0;  // 重置提示点击次数
        
        // 初始化面板前先停止当前游戏
        this.stopGame();
        
        // 初始化面板
        this.initPanels();
        
        // 开始游戏
        this.startGame();
        
        // 隐藏对话框
        document.getElementById('challengeModeDialog').style.display = 'none';
    }

    // 完成关卡
    completeLevel() {
        if (this.isChallengeModeActive) {
            // 记录当前关卡的完成信息
            const currentRecord = this.levelRecords[this.currentLevel - 1];
            currentRecord.completed = true;
            currentRecord.time = parseFloat(document.getElementById('timer').textContent);
            currentRecord.errors = parseInt(document.getElementById('errorCount').textContent);
            currentRecord.cheats = this.cheatClickCount;
            
            // 解锁下一关
            if (this.currentLevel === this.maxUnlockedLevel && 
                this.currentLevel < CHALLENGE_LEVELS.length) {
                this.maxUnlockedLevel++;
            }
            
            // 显示完成对话框
            this.showLevelCompleteDialog();
        } else {
            this.gameComplete();
        }
    }

    // 显示关卡完成对话框
    showLevelCompleteDialog() {
        const totalTime = document.getElementById('timer').textContent;
        const errorCount = document.getElementById('errorCount').textContent;
        const nextLevel = this.currentLevel + 1;
        let message;
        
        if (this.currentLevel < CHALLENGE_LEVELS.length) {
            // 如果不是最后一关，显示当前关卡完成信息和下一关信息
            message = t('level_complete_msg', this.currentLevel, totalTime, errorCount, nextLevel, nextLevel * 20);
             
            this.showCustomAlert(message, () => {
                this.currentLevel = nextLevel;
                // 获取下一关的配置
                const nextLevelConfig = CHALLENGE_LEVELS[nextLevel - 1];
                // 更新游戏参数
                this.width = nextLevelConfig.width;
                this.height = nextLevelConfig.height;
                this.cellSize = nextLevelConfig.cellSize;
                this.diffCount = nextLevelConfig.diffCount;
                
                // 重新初始化面板
                this.initPanels();
                
                // 开始新的一关
                this.isGameRunning = false;
                this.resetStats();
                this.generateColors();
                this.drawPanels();
                this.playSound('start');
                this.startTimer();
                this.isGameRunning = true;
            });
        } else {
            // 如果是最后一关，显示通关提示
            message = t('all_levels_complete_msg', totalTime, errorCount);
             
            this.showCustomAlert(message, () => {
                this.returnToMenu();
            });
        }
    }

    // 下一关
    nextLevel() {
        if (this.currentLevel < CHALLENGE_LEVELS.length) {
            this.currentLevel++;
            this.startChallengeLevel();
        } else {
            alert(t('alert_all_levels_done'));
            this.returnToMenu();
        }
    }

    // 重玩当前关卡
    retryLevel() {
        this.startChallengeLevel();
    }

    // 返回菜单
    returnToMenu() {
        this.stopGame();
        this.isChallengeModeActive = false;
        this.isShowingRecords = false;
        this.isShowingStartAlert = false;
        // 重置关卡记录
        this.levelRecords = Array(20).fill().map(() => ({
            completed: false,
            time: 0,
            errors: 0,
            cheats: 0
        }));
        document.getElementById('challengeModeDialog').style.display = 'none';
    }

    gameOver(message) {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        alert(message);
        this.stopGame();
    }

    // 添加新的方法来显示关卡开始提示
    showLevelStartAlert(level) {
        // 如果已经在显示提示，则不再显示
        if (this.isShowingStartAlert) return;
        
        // 设置显示状态为true
        this.isShowingStartAlert = true;
        
        // 确保游戏未开始运行和计时
        this.isGameRunning = false;
        this.stopTimer();
        
        const message = t('start_level_msg', level, level * 20);
        
        this.showCustomAlert(message, () => {
            // 点击OK后开始计时和游戏
            this.resetStats();  // 重置统计信息
            this.startTimer();
            this.isGameRunning = true;
            // 重置显示状态
            this.isShowingStartAlert = false;
        });
    }

    drawMouseTracker(x, y) {
        // 在两侧面板上显示跟踪效果
        this.leftCtx.save();
        this.rightCtx.save();
        
        // 绘制左侧面板的跟踪效果
        this.drawCrossHair(x, y, this.leftCtx);
        this.drawHighlightBox(x, y, this.leftCtx);
        
        // 绘制右侧面板的跟踪效果
        this.drawCrossHair(x, y, this.rightCtx);
        this.drawHighlightBox(x, y, this.rightCtx);
        
        this.leftCtx.restore();
        this.rightCtx.restore();
    }

    // 修改提示功能开关处理
    setHints(enabled) {
        if (!this.isGameRunning) return;
        
        this.showHints = enabled;
        this.drawPanels();
    }

    // 添加显示闯关记录的方法
    showChallengeRecords() {
        let message = t('records_title');
        
        // 遍历所有已完成的关卡记录
        this.levelRecords.forEach((record, index) => {
            if (record.completed) {
                message += `${t('record_level', index + 1)}  ${t('record_time', record.time.toFixed(3))}, ${t('record_errors', record.errors)}`;
                if (record.cheats > 0) {
                    message += `, ${t('record_cheats', record.cheats)}`;
                }
                message += '\n';
            }
        });
        
        // 计算总计数据
        const totalTime = this.levelRecords.reduce((sum, record) => sum + (record.completed ? record.time : 0), 0);
        const totalErrors = this.levelRecords.reduce((sum, record) => sum + (record.completed ? record.errors : 0), 0);
        const totalCheats = this.levelRecords.reduce((sum, record) => sum + (record.completed ? record.cheats : 0), 0);
        const completedLevels = this.levelRecords.filter(record => record.completed).length;
        
        message += t('record_total', completedLevels, totalTime.toFixed(3), totalErrors);
        if (totalCheats > 0) {
            message += t('record_total_cheats', totalCheats);
        }
        
        this.showCustomAlert(message, () => {
            // 在弹窗关闭后重置显示状态
            this.isShowingRecords = false;
        });
    }

    updateI18n() {
        if (!this.isGameRunning && this.leftColors === null) {
            this.initPanels(); // which will draw initial pattern translated
        }
        
        if (this.isChallengeModeActive) {
            updateChallengeModeDialog();
        }
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    window.game = new MagicWall();
    // 自动显示闯关模式对话框
    document.getElementById('challengeModeDialog').style.display = 'block';
    updateChallengeModeDialog();
});

// 菜单功能实现
function startGame() {
    window.game.startGame();
}

function stopGame() {
    window.game.stopGame();
}

function setCustomMode() {
    // 确保关闭闯关模式
    window.game.isChallengeModeActive = false;
    window.game.isCustomMode = true;
    // 重置闯关相关状态
    window.game.currentLevel = 1;
    window.game.maxUnlockedLevel = 1;
    window.game.levelRecords = Array(20).fill().map(() => ({
        completed: false,
        time: 0,
        errors: 0,
        cheats: 0
    }));
    document.getElementById('customModeDialog').style.display = 'flex';
}

function setChallengeMode() {
    // 确保关闭自定义模式
    window.game.isCustomMode = false;
    window.game.isChallengeModeActive = true;
    // 重置游戏状态
    window.game.stopGame();
    document.getElementById('challengeModeDialog').style.display = 'block';
    updateChallengeModeDialog();
}

function setMouseTracking(enabled) {
    window.game.isMouseTracking = enabled;
    // 如果关闭跟踪，重新绘制面板以清除十字线
    if (!enabled) {
        window.game.drawPanels();
    }
}

function setHints(enabled) {
    if (!window.game.isGameRunning) return;
    
    window.game.showHints = enabled;
    window.game.drawPanels();
}

function applyCustomMode() {
    window.game.applyCustomMode();
}

function closeCustomModeDialog() {
    document.getElementById('customModeDialog').style.display = 'none';
}

function closeChallengeDialog() {
    document.getElementById('challengeModeDialog').style.display = 'none';
    // 停止当前游戏
    window.game.stopGame();
}

function saveGame() {
    window.game.saveGame();
}

function loadGame() {
    window.game.loadGame();
}

// 关卡配置
const CHALLENGE_LEVELS = Array.from({ length: 20 }, (_, index) => {
    const level = index + 1;
    return {
        level: level,
        width: level * 20,  // 从20x20开始，每关增加20
        height: level * 20,
        cellSize: Math.max(5, 28 - (level - 1)), // 从28开始，每关减1
        diffCount: 5,   // 固定为5个差异点
        unlocked: level === 1 // 初始只解锁第一关
    };
});

// 更新闯关模式对话框
function updateChallengeModeDialog() {
    const game = window.game;
    const currentLevel = CHALLENGE_LEVELS[game.currentLevel - 1];
    if (!currentLevel) return; // 防止未定义错误

    // 更新关卡选择器
    const levelSelector = document.getElementById('levelSelector');
    levelSelector.innerHTML = '';
    
    CHALLENGE_LEVELS.forEach(level => {
        const option = document.createElement('option');
        option.value = level.level;
        option.textContent = t('level_option', level.level, level.width, level.width, level.diffCount);
        if (level.level === game.currentLevel) {
            option.selected = true;
        }
        levelSelector.appendChild(option);
    });
}

function selectLevel(level) {
    window.game.currentLevel = parseInt(level);
    updateChallengeModeDialog();
}

// 添加格式化时间的函数
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
} 