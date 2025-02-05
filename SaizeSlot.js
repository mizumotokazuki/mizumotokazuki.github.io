import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const menuList = [
  { menu: "1 1 2 0", menuName: "ミートソースボロニア風", key: 'lunch' },
  { menu: "1 1 2 1", menuName: "ほうれん草とパンチェッタのスパゲッティ", key: 'lunch' },
  { menu: "1 1 3 5", menuName: "タラコソースシシリー風", key: 'lunch' },
  { menu: "1 1 6 0", menuName: "タラコとエビのドリア", key: 'lunch' },
  { menu: "1 1 7 0", menuName: "牛100%ハンバーグ オニオンソース ライス通常サイズ", key: 'lunch' },
  { menu: "1 1 7 1", menuName: "牛100%ハンバーグ オニオンソース ライス大盛 +46円(税込50円)", key: 'lunch' },
  { menu: "1 1 7 2", menuName: "牛100%ハンバーグ オニオンソース ライス大盛 -46円(税込50円)", key: 'lunch' },
  { menu: "1 1 7 3", menuName: "牛100%ハンバーグ オニオンソース ミニフィセルに変更", key: 'lunch' },
  { menu: "1 1 7 4", menuName: "牛100%ハンバーグ オニオンソース プチフォッカに変更", key: 'lunch' },
  { menu: "1 1 9 0", menuName: "牛100%ハンバーグ 特製デミソース ライス通常サイズ", key: 'lunch' },
  { menu: "1 1 9 1", menuName: "牛100%ハンバーグ 特製デミソース ライス大盛 +46円(税込50円)", key: 'lunch' },
  { menu: "1 1 9 2", menuName: "牛100%ハンバーグ 特製デミソース ライス大盛 -46円(税込50円)", key: 'lunch' },
  { menu: "1 1 9 3", menuName: "牛100%ハンバーグ 特製デミソース ミニフィセルに変更", key: 'lunch' },
  { menu: "1 1 9 4", menuName: "牛100%ハンバーグ 特製デミソース プチフォッカに変更", key: 'lunch' },
  { menu: "1 2 0 2", menuName: "小エビのサラダ", key: 'side' },
  { menu: "1 2 0 5", menuName: "わかめのサラダ", key: 'side' },
  { menu: "1 2 0 9", menuName: "チキンのサラダ", key: 'side' },
  { menu: "1 3 0 1", menuName: "コーンクリームスープ", key: 'side' },
  { menu: "1 3 0 5", menuName: "田舎風ミネストローネ", key: 'side' },
  { menu: "1 3 0 7", menuName: "たまねぎのズッパ", key: 'side' },
  { menu: "1 4 0 1", menuName: "辛味チキン", key: 'side' },
  { menu: "1 4 0 2", menuName: "アロスティチーニ", key: 'side' },
  { menu: "1 4 0 3", menuName: "ほうれん草のソテー", key: 'side' },
  { menu: "1 4 0 4", menuName: "ポップコーンシュリンプ", key: 'side' },
  { menu: "1 4 0 5", menuName: "エスカルゴのオーブン焼き", key: 'side' },
  { menu: "1 4 0 6", menuName: "小エビのカクテル", key: 'side' },
  { menu: "1 4 0 7", menuName: "チョリソー", key: 'side' },
  { menu: "1 4 0 8", menuName: "蒸し鶏の香味ソース", key: 'side' },
  { menu: "1 4 1 0", menuName: "ムール貝のガーリック焼き", key: 'side' },
  { menu: "1 4 1 3", menuName: "爽やかにんじんサラダ", key: 'side' },
  { menu: "1 4 1 5", menuName: "カリッとポテト", key: 'side' },
  { menu: "1 4 1 7", menuName: "バッファローモッツァレラのカプレーゼ", key: 'side' },
  { menu: "1 4 2 2", menuName: "ハモン・セラーノ", key: 'side' },
  { menu: "1 4 2 3", menuName: "生ハムとバッファローモッツァレラの盛り合わせ", key: 'side' },
  { menu: "1 4 2 5", menuName: "柔らか青豆の温サラダ", key: 'side' },
  { menu: "1 4 3 5", menuName: "スイートコーン", key: 'side' },
  { menu: "1 4 5 2", menuName: "アロスティチーニ Wサイズ", key: 'side' },
  { menu: "2 1 0 1", menuName: "ミラノ風ドリア", key: 'main' },
  { menu: "2 1 0 3", menuName: "半熟卵のミラノ風ドリア", key: 'main' },
  { menu: "2 1 0 6", menuName: "タラコとエビのドリア", key: 'main' },
  { menu: "2 1 0 8", menuName: "焼きチーズ ミラノ風ドリア", key: 'main' },
  { menu: "2 1 0 9", menuName: "エビとタラコのクリームグラタン(全粒粉)", key: 'main' },
  { menu: "2 2 0 3", menuName: "バッファローモッツァレラのマルゲリータピザ", key: 'main' },
  { menu: "2 2 0 4", menuName: "野菜ときのこのピザ", key: 'main' },
  { menu: "2 2 0 6", menuName: "たっぷりコーンのピザ", key: 'main' },
  { menu: "2 2 0 8", menuName: "ソーセージピザ", key: 'main' },
  { menu: "2 3 0 1", menuName: "タラコソースシシリー風", key: 'main' },
  { menu: "2 3 0 3", menuName: "ペペロンチーノ", key: 'main' },
  { menu: "2 3 0 4", menuName: "パルマ風スパゲッティ", key: 'main' },
  { menu: "2 3 0 5", menuName: "カルボナーラ", key: 'main' },
  { menu: "2 3 0 6", menuName: "ミートソースボロニア風", key: 'main' },
  { menu: "2 3 1 0", menuName: "スープ入り塩味ボンゴレ", key: 'main' },
  { menu: "2 3 1 6", menuName: "半熟卵のミートソースボロニア風", key: 'main' },
  { menu: "2 3 1 7", menuName: "半熟卵のペペロンチーノ", key: 'main' },
  { menu: "2 3 2 0", menuName: "小エビのタラコソース", key: 'main' },
  { menu: "2 3 2 1", menuName: "きのことほうれん草のクリームスパゲッティ", key: 'main' },
  { menu: "2 3 2 5", menuName: "ペンネアラビアータ(全粒粉)", key: 'main' },
  { menu: "2 3 2 8", menuName: "イカの墨入りセピアソース", key: 'main' },
  { menu: "2 4 0 2", menuName: "若鳥のディアボラ風", key: 'main' },
  { menu: "2 4 0 3", menuName: "イタリアンハンバーグ", key: 'main' },
  { menu: "2 4 0 4", menuName: "柔らかチキンのチーズ焼き", key: 'main' },
  { menu: "2 4 0 6", menuName: "ハンバーグステーキ", key: 'main' },  
  { menu: "2 4 0 7", menuName: "ディアボラ風ハンバーグ", key: 'main' },
  { menu: "2 4 1 3", menuName: "ラムと野菜のグリル", key: 'main' },
  { menu: "2 4 1 8", menuName: "ミックスグリル", key: 'main' },
  { menu: "3 1 0 1", menuName: "ライス", key: 'side' },
  { menu: "3 1 0 2", menuName: "ラージライス", key: 'side' },
  { menu: "3 1 0 3", menuName: "スモールライス", key: 'side' },
  { menu: "3 1 0 4", menuName: "シナモンプチフォッカ", key: 'side' },
  { menu: "3 1 0 6", menuName: "プチフォッカ", key: 'side' },
  { menu: "3 1 0 8", menuName: "ミニフィセル", key: 'side' },
  { menu: "3 1 0 9", menuName: "ガーリックトースト", key: 'side' },
  { menu: "3 2 0 1", menuName: "ティラミス クラシコ", key: 'dessert' },
  { menu: "3 2 0 4", menuName: "ジェラート＆シナモンプチフォッカ", key: 'dessert' },
  { menu: "3 2 0 5", menuName: "イタリアンジェラート", key: 'dessert' },
  { menu: "3 2 0 6", menuName: "イタリアンプリン", key: 'dessert' },
  { menu: "3 2 0 7", menuName: "チョコレートケーキ", key: 'dessert' },
  { menu: "3 2 1 2", menuName: "プリンとティラミス クラシコの盛り合わせ", key: 'dessert' },
  { menu: "3 2 1 3", menuName: "トリフアイスクリーム", key: 'dessert' },
  { menu: "3 2 1 5", menuName: "コーヒーゼリー＆イタリアンジェラート", key: 'dessert' },
  { menu: "3 3 0 1", menuName: "生ビール ジョッキ", key: 'alcohol' },
  { menu: "3 3 0 2", menuName: "グラスビール", key: 'alcohol' },
  { menu: "3 3 0 3", menuName: "アサヒドライゼロ", key: 'alcohol' },
  { menu: "3 3 0 4", menuName: "キリン氷結シチリア産レモン", key: 'alcohol' },
  { menu: "3 3 0 6", menuName: "グラッパ (30ml)", key: 'alcohol' },
  { menu: "3 4 0 1", menuName: "赤グラスワイン (120ml)", key: 'alcohol' },
  { menu: "3 4 0 2", menuName: "白グラスワイン (120ml)", key: 'alcohol' },
  { menu: "3 4 0 3", menuName: "赤デカンタ (250ml)", key: 'alcohol' },
  { menu: "3 4 0 4", menuName: "白デカンタ (250ml)", key: 'alcohol' },
  { menu: "3 4 0 5", menuName: "赤デカンタ (500ml)", key: 'alcohol' },
  { menu: "3 4 0 6", menuName: "白デカンタ (500ml)", key: 'alcohol' },
  { menu: "3 4 0 7", menuName: "赤マグナム (1500ml)", key: 'alcohol' },
  { menu: "3 4 0 8", menuName: "白マグナム (1500ml)", key: 'alcohol' },
  { menu: "3 4 1 2", menuName: "ランブルスコロゼ  ロゼ・発泡/甘口", key: 'alcohol' },
  { menu: "3 4 1 3", menuName: "ドンラファエロ  白・発泡/辛口", key: 'alcohol' },
  { menu: "3 4 1 4", menuName: "ランブルスコセッコ  赤・発泡/辛口", key: 'alcohol' },
  { menu: "3 4 1 5", menuName: "ベルデッキオ  白/辛口", key: 'alcohol' },
  { menu: "3 4 1 6", menuName: "キャンティ  赤/辛口", key: 'alcohol' },
  { menu: "3 4 1 9", menuName: "キャンティ ルフィナ リゼルバ  赤/辛口 フルボディ", key: 'alcohol' },
  { menu: "4 3 0 1", menuName: "トッピング半熟卵", key: 'topping' },
  { menu: "4 3 0 4", menuName: "野菜ペースト", key: 'topping' },
  { menu: "4 3 0 7", menuName: "トッピング粉チーズ(グランモラビア)", key: 'topping' },
  { menu: "5 1 0 1", menuName: "セットドリンクバー (料理やデザートをご注文のお客様限定)", key: 'free' },
  { menu: "5 1 0 2", menuName: "キッズ (小学生以下のお客様 ※3歳までのお子様は無料です。)", key: 'free' },
  { menu: "5 1 0 3", menuName: "単品 (ドリンクバーのみご利用のお客様限定)", key: 'free' },
  { menu: "5 1 0 4", menuName: "ランチドリンクバー (ランチメニューをご注文のお客様限定)", key: 'lunch' },
  { menu: "5 3 0 5", menuName: "サイゼリヤドレッシング", key: 'free' },
  { menu: "5 3 0 6", menuName: "エクストラ・バージン・オリーブオイル", key: 'free' },
];

const categories = [
  { key: 'main', label: 'メインメニュー' },
  { key: 'side', label: 'サイドメニュー' },
  { key: 'lunch', label: 'ランチメニュー' },
  { key: 'dessert', label: 'デザート' },
  { key: 'alcohol', label: 'アルコール' },
  { key: 'topping', label: 'トッピング' },
  { key: 'free', label: 'その他' },
];

export default function SaizeSlot() {
  // カテゴリ選択用
  const [selectedCategories, setSelectedCategories] = useState([]);
  // 抽選されたメニュー情報（最終結果）
  const [selectedMenu, setSelectedMenu] = useState(null);
  // 各リールの表示数字（初期は空文字）
  const [reelValues, setReelValues] = useState(["", "", "", ""]);
  // 各リールが停止済みかどうかのフラグ
  const [stoppedReels, setStoppedReels] = useState([false, false, false, false]);
  // リールのアニメーション用タイマーを管理するref配列
  const intervalRefs = useRef([]);
  // スロットを回すボタンの無効化状態（スピン中は無効）
  const [spinDisabled, setSpinDisabled] = useState(false);
  // リセット可能かどうか（全リール停止後にtrue）
  const [resetAvailable, setResetAvailable] = useState(false);
  // スロット回転中かどうかのフラグ
  const [spinning, setSpinning] = useState(false);
  // debugModeの初期はfalse
  const [debugMode, setDebugMode] = useState(false);
  // ヘッダータップ回数を管理
  const [headerTapCount, setHeaderTapCount] = useState(0);

  // カテゴリのON/OFF切り替え
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // スロット（リール）回転開始時の処理
  const startSpin = () => {
    // カテゴリが選択されていない場合はアラート表示
    if (selectedCategories.length === 0) {
      Alert.alert("カテゴリ未選択", "まずカテゴリを選択してください。");
      return;
    }
    // 選択されたカテゴリに該当するメニューを抽出
    const filteredItems = menuList.filter(item =>
      selectedCategories.includes(item.key)
    );
    if (filteredItems.length === 0) {
      Alert.alert("対象メニューなし", "選択したカテゴリに該当するメニューがありません。");
      return;
    }
    // 抽選で1件選ぶ
    const randomItem = filteredItems[Math.floor(Math.random() * filteredItems.length)];
    setSelectedMenu(randomItem);
    // menuの数字から空白を除去して各桁を配列にする（例："1 1 2 0" → ["1","1","2","0"]）
    const finalDigits = randomItem.menu.replace(/\s/g, '').split('');
    // 初期状態として、各リールはランダムな数字を表示開始
    setSpinning(true);
    setSpinDisabled(true);
    setResetAvailable(false);
    setStoppedReels([false, false, false, false]);
    // 各リールのタイマーをセット（100ms毎にランダムな数字更新）
    intervalRefs.current = [0, 1, 2, 3].map((index) =>
      setInterval(() => {
        setReelValues((prev) => {
          const newValues = [...prev];
          newValues[index] = Math.floor(Math.random() * 10).toString();
          return newValues;
        });
      }, 100)
    );
    // 最終的な数字はfinalDigitsで管理（各リール停止時に使用）
    // ※ここではfinalDigitsをクロージャで保持
    intervalRefs.current.finalDigits = finalDigits;
  };

  // 各リールの停止処理
  const stopReel = (index) => {
    if (!spinning || stoppedReels[index]) return;
    // 該当リールのタイマーをクリア
    clearInterval(intervalRefs.current[index]);
    // finalDigitsから最終の数字を取得して表示にセット
    const finalDigits = intervalRefs.current.finalDigits;
    setReelValues((prev) => {
      const newValues = [...prev];
      newValues[index] = finalDigits[index];
      return newValues;
    });
    // 停止済みフラグを更新
    setStoppedReels((prev) => {
      const newStopped = [...prev];
      newStopped[index] = true;
      // 全てのリールが停止していたらリセット可能にする
      if (newStopped.every(val => val)) {
        setResetAvailable(true);
        setSpinning(false);
        setSpinDisabled(false);
      }
      return newStopped;
    });
  };

  // リセット処理（初期状態に戻す）
  const resetSlot = () => {
    // 全てのタイマーがあればクリア
    intervalRefs.current.forEach(timer => clearInterval(timer));
    setReelValues(["", "", "", ""]);
    setStoppedReels([false, false, false, false]);
    setSelectedMenu(null);
    setResetAvailable(false);
    setSpinDisabled(false);
    setSpinning(false);
  };

  // コンポーネントアンマウント時にタイマーをクリアする
  useEffect(() => {
    return () => {
      intervalRefs.current.forEach(timer => clearInterval(timer));
    };
  }, []);

  // ヘッダータップ時、7回タップでdebugModeを切り替え
  const handleHeaderTap = () => {
    const newCount = headerTapCount + 1;
    if (newCount >= 7) {
      setDebugMode(prev => !prev);
      setHeaderTapCount(0);
    } else {
      setHeaderTapCount(newCount);
    }
  };

  return (
    <View style={styles.container}>
      {/* ヘッダー（タップでデバッグモード切替） */}
      <TouchableWithoutFeedback onPress={handleHeaderTap}>
        <View style={styles.header}>
          <Text style={styles.headerText}>SaizeSlot</Text>
        </View>
      </TouchableWithoutFeedback>
      
      {/* カテゴリ選択エリア */}
      <View style={styles.categoriesContainer}>
        {categories.map(item => (
          <TouchableOpacity
            key={item.key}
            onPress={() => toggleCategory(item.key)}
            style={[
              styles.categoryButton,
              selectedCategories.includes(item.key) && styles.categoryButtonSelected
            ]}
          >
            <Text style={styles.categoryButtonText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* リール表示エリア：各リールとその停止ボタンを縦に配置 */}
      <View style={styles.slotContainer}>
        <View style={styles.reelsWithButtonsContainer}>
          {reelValues.map((value, index) => (
            <View key={index} style={styles.reelColumn}>
              <View style={styles.reel}>
                <Text style={styles.reelText}>{value}</Text>
              </View>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => stopReel(index)}
                disabled={!spinning || stoppedReels[index]}
              >
                <Icon name="stop-circle" size={46} color={!spinning || stoppedReels[index] ? '#aaa' : '#7fbfff'} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* スロット回転／リセットボタン */}
      <View style={styles.spinResetContainer}>
        <TouchableOpacity
          style={styles.spinResetButton}
          onPress={resetAvailable ? resetSlot : startSpin}
          disabled={spinDisabled}
        >
          <Icon name={resetAvailable ? "refresh" : "play-circle"} size={50} color={spinDisabled ? '#aaa' : '#7fbfff'} />
          <Text style={styles.spinResetText}>{resetAvailable ? "リセット" : "スロットを回す"}</Text>
        </TouchableOpacity>
      </View>

      {/* 結果表示（debugModeの場合のみ表示） */}
      {debugMode && selectedMenu && resetAvailable && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {selectedMenu.menuName}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0', paddingTop: 40 },
  header: { backgroundColor: '#7fbfff', padding: 15, alignItems: 'center' },
  headerText: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  debugText: { color: '#fff', fontSize: 14, marginTop: 5 },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff'
  },
  categoryButton: {
    backgroundColor: '#eee',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
  },
  categoryButtonSelected: {
    backgroundColor: '#b2ffd8',
  },
  categoryButtonText: { fontSize: 16 },
  slotContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reelsWithButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reelColumn: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  reel: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    minWidth: 60,
    alignItems: 'center',
    marginBottom: 25,
  },
  reelText: { fontSize: 28, fontWeight: 'bold' },
  iconButton: { alignItems: 'center', marginTop: 16 },
  iconButtonText: { marginTop: 5, fontSize: 14 },
  spinResetContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconButton: { alignItems: 'center', marginHorizontal: 10 },
  iconButtonText: { marginTop: 5, fontSize: 14 },
  spinResetContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  spinResetButton: { alignItems: 'center' },
  spinResetText: { fontSize: 18, marginTop: 5, color: '#7fbfff' },
  resultContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  resultText: { fontSize: 18, textAlign: 'center' },
});