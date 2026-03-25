const i18n = {
    zh: {
        title: "找茬模拟器合集",
        menu_wall_type: "找茬类型",
        wall_color: "魔方墙",
        wall_alphabet: "字母墙",
        wall_chinese: "汉字墙",
        wall_mahjong: "麻将墙",
        wall_emoji: "Emoji墙",
        wall_emoji2: "Emoji²墙",
        wall_dynamic: "动态墙 ⚡",
        dyn_palette_title: "动态配色",
        dyn_palette_a: "🎨 A · 经典纯色",
        dyn_palette_b: "🌅 B · 暖色偏移",
        dyn_palette_c: "⚡ C · 霍光高饱",
        dyn_palette_d: "🍬 D · 马卡龙",
        menu_game_mode: "游戏模式",
        mode_custom: "自定义模式",
        mode_challenge: "闯关模式",
        menu_stop: "停止",
        menu_mouse_track: "鼠标跟踪",
        track_on: "跟踪",
        track_off: "不跟踪",
        menu_hints: "提示",
        hints_on: "显示",
        hints_off: "不显示",
        menu_save_game: "游戏存档",
        save_btn: "存档",
        load_btn: "读档",
        menu_lang: "语言",
        lang_zh: "简体中文",
        lang_en: "English",
        menu_theme: "主题类型",
        menu_visual: "视觉效果",
        menu_game_ctrl: "游戏控制",
        menu_settings: "辅助设置",
        emoji_bg_on: "🎨 方块底色: 开",
        emoji_bg_off: "🎨 方块底色: 关",
        hints_on_state: "提示开启",
        hints_off_state: "提示关闭",
        track_on_state: "跟踪开启",
        track_off_state: "跟踪关闭",

        // stats
        stat_errors: "点击错误次数：",
        stat_found: "已找到个数：",
        stat_time: "用时：",
        stat_blocks: "方块个数：",
        lab_info: "© 2024-2026 AIGC_3D视觉实验室. All Rights Reserved.",

        // dialogs
        dialog_challenge_title: "闯关模式",
        btn_start: "开始游戏",
        btn_back: "返回",
        dialog_custom_title: "自定义模式设置",
        custom_width: "宽 度：",
        custom_height: "高 度：",
        custom_cellsize: "方块大小：",
        custom_diff: "差异数量：",
        custom_font: "字 体：",
        font_arial: "Arial (默认)",
        font_yahei: "微软雅黑",
        font_kaiti: "楷体",
        font_simsun: "宋体",
        font_simhei: "黑体",
        font_fangsong: "仿宋",
        custom_scheme: "配色/字母<br>&nbsp;&nbsp;方 案",
        scheme_1: "方案一 (大写)",
        scheme_2: "方案二 (小写)",
        btn_confirm: "确 认",
        btn_cancel: "取 消",

        // js dynamic
        alert_init_fail: "游戏初始化失败，请尝试减小方块数量或方块大小",
        alert_size_too_large: "画布尺寸过大 ({0}x{1}). 请减小方块数量或方块大小.",
        alert_memory_too_large: "预计内存使用过大 ({0}MB). 请减小方块数量或方块大小.",
        text_generated_diffs: "生成了 {0} 个差异点",
        text_eng_wall: "英文字母墙找茬",
        text_chn_wall: "汉字墙找茬",
        text_mahjong_wall: "麻将墙找茬",
        text_emoji_wall: "Emoji墙找茬",
        text_emoji2_wall: "Emoji²墙找茬",
        text_color_wall: "魔方色块墙找茬",
        text_dynamic_wall: "动态墙找茬 (进阶)",
        text_lab: "AIGC_3D视觉实验室",
        alert_save_success: "游戏已保存",
        alert_save_fail: "保存游戏失败",
        alert_load_success: "游戏已加载",
        alert_load_fail_no_save: "没有找到存档",
        alert_load_fail: "加载游戏失败",
        alert_max_cells: "方块总数不能超过40000个，请减小宽度或高度",
        
        game_over_cheat: "哈哈，你作弊了！\n\n差异个数：{0}\n提示次数：{1}\n总耗时：{2}秒",
        game_over_success: "恭喜挑战成功！\n\n差异个数：{0}\n点错次数：{1}\n总耗时：{2}秒",

        level_option: "第 {0} 关 ( {1}x{2}，差异:{3} )",
        challenge_req: "闯关要求",
        time_limit: "限时：{0} 秒",
        diff_count_req: "差异个数：{0}个",
        error_limit: "错误上限：3次（超限即失败）",
        no_hints: "禁止使用提示功能",
        challenge_fail_title: "挑战失败",
        challenge_fail_errors: "错误次数超过3次！",
        challenge_fail_time: "时间耗尽！",
        challenge_fail_hint: "使用了提示功能，挑战无效！",
        challenge_progress: "已找差异：{0}/{1}",
        challenge_success_title: "闯关成功！",
        challenge_success_time: "耗时：{0}秒",
        challenge_success_errors: "错误：{0}次",
        challenge_next: "下一关",
        challenge_records: "闯关记录",
        record_level: "第 {0} 关:",
        record_completed: "完成",
        record_not_completed: "未完成",
        record_time: "时间: {0}秒",
        record_errors: "错误: {0}次",
        record_cheats: "提示: {0}次",
        
        level_complete_msg: "恭喜完成第{0}关！\n\n用时：{1}秒\n点错次数：{2}\n\n---------------\n\n准备进入第{3}关\n方块数量：{4}x{4}\n差异点数：5个",
        all_levels_complete_msg: "恭喜完成最后一关！\n\n用时：{0}秒\n点错次数：{1}\n\n---------------\n\n你已完成所有关卡！",
        alert_all_levels_done: "恭喜！你已完成所有关卡！",
        start_level_msg: "准备开始第{0}关！\n\n方块数量：{1}x{1}\n\n差异点数：5个",
        records_title: "闯关模式记录\n\n",
        record_total: "\n总计\n完成 {0}关\n总用时 {1}秒, 总点错 {2}次",
        record_total_cheats: ", 总提示 {0}次\n",
        
        status_time: "剩余时间: {0} | 错误: {1}/3 | 已找差异: {2}/{3}",
        
        btn_retry: "重新挑战",
        btn_close: "关闭",
        alert_unlock_first: "请先通过前面的关卡！",
        // validation
        val_total_cells: "方块总数不能超过40000个，请减小宽度或高度",
        val_canvas_size: "画布尺寸过大，请减小方块数量或方块大小",
        val_dimension: "宽度和高度必须在10-200之间",
        val_cell_size: "方块大小必须在5-50之间",
        val_diff_count: "差异数量必须大于0且小于{0}",
        level_option: "第{0}关 - {1}x{2}方块",
        menu_lang_toggle: "Language"
    },
    en: {
        title: "Spot the Difference Simulator",
        menu_wall_type: "Spot Difference Type",
        wall_color: "Color Wall",
        wall_alphabet: "Alphabet Wall",
        wall_chinese: "Chinese Wall",
        wall_mahjong: "Mahjong Wall",
        wall_emoji: "Emoji Wall",
        wall_emoji2: "Emoji² Wall",
        wall_dynamic: "Dynamic Wall ⚡",
        dyn_palette_title: "Dynamic Palette",
        dyn_palette_a: "🎨 A · Classic",
        dyn_palette_b: "🌅 B · Warm Shift",
        dyn_palette_c: "⚡ C · Neon",
        dyn_palette_d: "🍬 D · Macaron",
        menu_game_mode: "Game Mode",
        mode_custom: "Custom Mode",
        mode_challenge: "Challenge Mode",
        menu_stop: "Stop",
        menu_mouse_track: "Mouse Track",
        track_on: "On",
        track_off: "Off",
        menu_hints: "Hints",
        hints_on: "Show",
        hints_off: "Hide",
        menu_save_game: "Game Save",
        save_btn: "Save",
        load_btn: "Load",
        menu_lang: "Language",
        lang_zh: "简体中文",
        lang_en: "English",
        menu_theme: "Theme",
        menu_visual: "Visuals",
        menu_game_ctrl: "Game Control",
        menu_settings: "Settings",
        emoji_bg_on: "🎨 Tile BG: ON",
        emoji_bg_off: "🎨 Tile BG: OFF",
        hints_on_state: "Hints ON",
        hints_off_state: "Hints OFF",
        track_on_state: "Track ON",
        track_off_state: "Track OFF",

        // stats
        stat_errors: "Errors: ",
        stat_found: "Found: ",
        stat_time: "Time: ",
        stat_blocks: "Blocks: ",
        lab_info: "© 2024-2026 AIGC_3D Vision Lab. All Rights Reserved.",

        // dialogs
        dialog_challenge_title: "Challenge Mode",
        btn_start: "Start",
        btn_back: "Back",
        dialog_custom_title: "Custom Mode Settings",
        custom_width: "Width: ",
        custom_height: "Height: ",
        custom_cellsize: "Cell Size: ",
        custom_diff: "Differences: ",
        custom_font: "Font: ",
        font_arial: "Arial (Default)",
        font_yahei: "YaHei",
        font_kaiti: "KaiTi",
        font_simsun: "SimSun",
        font_simhei: "SimHei",
        font_fangsong: "FangSong",
        custom_scheme: "Scheme",
        scheme_1: "Scheme 1 (Upper)",
        scheme_2: "Scheme 2 (Lower)",
        btn_confirm: "Confirm",
        btn_cancel: "Cancel",

        // js dynamic
        alert_init_fail: "Game initialization failed. Please try reducing cell count or size.",
        alert_size_too_large: "Canvas size too large ({0}x{1}). Please reduce cell count or size.",
        alert_memory_too_large: "Estimated memory usage too high ({0}MB). Please reduce cell count or size.",
        text_generated_diffs: "Generated {0} differences",
        text_eng_wall: "Alphabet Spot Difference",
        text_chn_wall: "Chinese Spot Difference",
        text_mahjong_wall: "Mahjong Spot Difference",
        text_emoji_wall: "Emoji Spot Difference",
        text_emoji2_wall: "Emoji² Spot Difference",
        text_color_wall: "Color Spot Difference",
        text_dynamic_wall: "Dynamic Wall (Advanced)",
        text_lab: "AIGC_3D Vision Lab",
        alert_save_success: "Game saved successfully.",
        alert_save_fail: "Failed to save game.",
        alert_load_success: "Game loaded successfully.",
        alert_load_fail_no_save: "No save found.",
        alert_load_fail: "Failed to load game.",
        alert_max_cells: "Total cells cannot exceed 40000. Please reduce width or height.",
        
        game_over_cheat: "Haha, you cheated!\n\nDifferences: {0}\nHint uses: {1}\nTotal time: {2}s",
        game_over_success: "Congratulations!\n\nDifferences: {0}\nErrors: {1}\nTotal time: {2}s",

        level_option: "Level {0} ( {1}x{2}, Diff:{3} )",
        challenge_req: "Requirements",
        time_limit: "Time limit: {0}s",
        diff_count_req: "Differences: {0}",
        error_limit: "Max Errors: 3 (Fail if exceeded)",
        no_hints: "Hints strictly prohibited",
        challenge_fail_title: "Challenge Failed",
        challenge_fail_errors: "Exceeded 3 errors!",
        challenge_fail_time: "Time's up!",
        challenge_fail_hint: "Used hint, challenge voided!",
        challenge_progress: "Found: {0}/{1}",
        challenge_success_title: "Success!",
        challenge_success_time: "Time: {0}s",
        challenge_success_errors: "Errors: {0}",
        challenge_next: "Next Level",
        challenge_records: "Challenge Records",
        record_level: "Level {0}:",
        record_completed: "Completed",
        record_not_completed: "Not completed",
        record_time: "Time: {0}s",
        record_errors: "Errors: {0}",
        record_cheats: "Hints: {0}",
        
        level_complete_msg: "Level {0} Cleared!\n\nTime: {1}s\nErrors: {2}\n\n---------------\n\nReady for Level {3}\nCells: {4}x{4}\nDifferences: 5",
        all_levels_complete_msg: "All Levels Cleared!\n\nTime: {0}s\nErrors: {1}\n\n---------------\n\nCongratulations!",
        alert_all_levels_done: "Congratulations! You have completed all levels!",
        start_level_msg: "Get ready for Level {0}!\n\nCells: {1}x{1}\n\nDifferences: 5",
        records_title: "Challenge Records",
        record_total: "\nTotal\nCompleted {0} levels\nTotal Time {1}s, Errors {2}",
        record_total_cheats: ", Hints {0}\n",
        
        status_time: "Time left: {0} | Errors: {1}/3 | Found: {2}/{3}",
        
        btn_retry: "Retry",
        btn_close: "Close",
        alert_unlock_first: "Please pass the previous levels first!",
        // validation
        val_total_cells: "Total cells cannot exceed 40000. Please reduce width or height.",
        val_canvas_size: "Canvas size too large. Please reduce cell count or size.",
        val_dimension: "Width and height must be between 10-200.",
        val_cell_size: "Cell size must be between 5-50.",
        val_diff_count: "Differences must be between 1 and {0}.",
        
        level_complete_msg: "Level {0} Cleared!\n\nTime: {1}s\nErrors: {2}\n\n---------------\n\nReady for Level {3}\nCells: {4}x{4}\nDifferences: 5",
        all_levels_complete_msg: "All Levels Cleared!\n\nTime: {0}s\nErrors: {1}\n\n---------------\n\nCongratulations!",
        alert_all_levels_done: "Congratulations! You have completed all levels!",
        start_level_msg: "Get ready for Level {0}!\n\nCells: {1}x{1}\n\nDifferences: 5",
        records_title: "Challenge Records",
        record_total: "\nTotal\nCompleted {0} levels\nTotal Time {1}s, Errors {2}",
        record_total_cheats: ", Hints {0}\n",
        level_option: "Level {0} - {1}x{2} Cells",
        menu_lang_toggle: "语言"
    }
};

let currentLang = 'zh';

function toggleLanguage() {
    setLanguage(currentLang === 'zh' ? 'en' : 'zh');
}

function t(key, ...args) {
    let str = i18n[currentLang][key] || key;
    args.forEach((arg, i) => {
        str = str.split(`{${i}}`).join(arg);
    });
    return str;
}

function setLanguage(lang) {
    if (i18n[lang]) {
        currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[lang][key]) {
                el.innerHTML = i18n[lang][key];
            }
        });
        
        // Update game if it exists
        if (window.game) {
            window.game.updateI18n();
        }
    }
}
