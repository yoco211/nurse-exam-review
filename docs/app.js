const defaultPastQuestions = [
  ["115", "2026", "必修", "標準", "成人の安静時の正常な脈拍数に最も近いのはどれか。", ["20〜30回/分", "60〜100回/分", "120〜160回/分", "180〜220回/分"], 1, "成人の安静時脈拍は一般に60〜100回/分である。", "確認ポイント：安静時、成人、正常な脈拍数。"],
  ["115", "2026", "人体構造", "標準", "心臓から全身へ血液を送り出す主な血管はどれか。", ["大動脈", "肺静脈", "上大静脈", "門脈"], 0, "左心室から拍出された血液は大動脈を通って全身へ送られる。", "体循環と肺循環の流れを図で確認する。"],
  ["115", "2026", "疾病看護", "応用", "慢性閉塞性肺疾患の患者にみられやすい症状はどれか。", ["労作時呼吸困難", "多尿", "徐脈", "黄疸"], 0, "COPDでは気流制限により労作時呼吸困難、咳嗽、喀痰などがみられやすい。", "禁煙支援、呼吸リハビリ、増悪予防も重要。"],
  ["114", "2025", "人体構造", "基礎", "血液中で酸素運搬を主に担う成分はどれか。", ["血小板", "白血球", "赤血球", "血漿"], 2, "赤血球に含まれるヘモグロビンが酸素運搬を担う。", "赤血球とヘモグロビンの働きをセットで覚える。"],
  ["114", "2025", "必修", "基礎", "医療安全におけるインシデント報告の目的で適切なのはどれか。", ["再発防止に役立てる", "個人を罰する", "記録を残さない", "患者に説明しない"], 0, "インシデント報告は原因分析と再発防止に活用するための仕組みである。", "医療安全では個人責任だけでなくシステム改善を考える。"],
  ["114", "2025", "在宅看護", "標準", "訪問看護で初回訪問時に優先して確認する内容はどれか。", ["療養環境と本人の希望", "近隣住民の趣味", "家具の購入価格", "テレビ番組の好み"], 0, "初回訪問では療養環境、生活状況、本人・家族の希望、緊急時対応などを確認する。", "在宅では生活の場を理解する視点が必要。"],
  ["113", "2024", "疾病看護", "標準", "糖尿病患者への生活指導で優先度が高い内容はどれか。", ["水分摂取を完全に制限する", "足部の観察を習慣化する", "運動はすべて避ける", "食事回数を1日1回にする"], 1, "糖尿病では末梢神経障害や足病変が起こりやすいため、足部観察、清潔、適切な靴の選択が重要である。", "糖尿病看護ではフットケアが頻出。"],
  ["113", "2024", "社会保障", "標準", "成年後見制度の説明で適切なのはどれか。", ["判断能力が不十分な人を支援する", "医療者だけが利用できる", "未成年者だけを対象とする", "本人の意思確認を不要にする"], 0, "成年後見制度は判断能力が不十分な人の権利や生活を支援する制度である。", "権利擁護と意思決定支援を関連づける。"],
  ["113", "2024", "必修", "基礎", "バイタルサインに含まれる項目はどれか。", ["体温", "視力", "身長", "血液型"], 0, "バイタルサインには体温、脈拍、呼吸、血圧、意識状態などが含まれる。", "正常値と測定時の注意点を合わせて覚える。"],
  ["112", "2023", "社会保障", "標準", "介護保険制度の保険者はどれか。", ["国", "都道府県", "市町村および特別区", "医療機関"], 2, "介護保険制度の保険者は市町村および特別区である。", "保険者、被保険者、給付の関係を整理する。"],
  ["112", "2023", "疾病看護", "標準", "褥瘡予防の看護で適切なのはどれか。", ["定期的に体位変換を行う", "皮膚を湿ったままにする", "栄養状態を確認しない", "圧迫部位を放置する"], 0, "褥瘡予防では体位変換、圧迫除去、皮膚観察、栄養管理が重要である。", "リスク評価にはブレーデンスケールなどが用いられる。"],
  ["112", "2023", "人体構造", "標準", "インスリンを分泌する主な臓器はどれか。", ["膵臓", "肝臓", "脾臓", "腎臓"], 0, "インスリンは膵臓のランゲルハンス島β細胞から分泌され、血糖を下げる。", "インスリンとグルカゴンの作用を対比する。"],
  ["111", "2022", "在宅看護", "応用", "在宅酸素療法を受ける利用者への説明で適切なのはどれか。", ["火気を近づけない", "流量は自由に増減してよい", "外出は必ず禁止する", "加湿器の水は交換しなくてよい"], 0, "酸素は燃焼を助けるため、火気を近づけてはならない。酸素流量は医師の指示に従って使用する。", "在宅酸素療法では火気厳禁が基本。"],
  ["111", "2022", "社会保障", "基礎", "日本の国民皆保険制度の特徴で適切なのはどれか。", ["原則として全ての国民が公的医療保険に加入する", "医療保険は任意加入のみである", "高齢者は制度の対象外である", "保険料は医療機関が全額負担する"], 0, "日本では国民皆保険により、原則としてすべての国民が公的医療保険に加入する。", "医療保険、介護保険、年金を分けて整理する。"],
  ["111", "2022", "在宅看護", "標準", "在宅療養者の災害対策で適切なのはどれか。", ["非常時の連絡先と必要物品を確認する", "医療機器の電源対策は不要である", "避難先を決めない", "家族への説明を避ける"], 0, "在宅療養では災害時の連絡先、避難方法、薬剤、医療機器の電源確保を確認する。", "酸素療法や人工呼吸器使用者では停電時の対応が重要。"],
  ["115", "2026", "必修", "基礎", "標準予防策で最も基本となる行動はどれか。", ["手指衛生", "絶食", "安静臥床", "酸素投与"], 0, "標準予防策はすべての患者に適用され、手指衛生が基本である。", "手指衛生のタイミングを整理する。"],
  ["115", "2026", "必修", "標準", "成人の正常な体温に最も近いのはどれか。", ["32.0℃", "36.5℃", "39.5℃", "42.0℃"], 1, "成人の腋窩温はおおむね36℃台が正常範囲の目安である。", "バイタルサインの正常値をまとめて確認する。"],
  ["115", "2026", "人体構造", "基礎", "尿を生成する主な臓器はどれか。", ["腎臓", "胃", "胆嚢", "甲状腺"], 0, "腎臓は血液をろ過して尿を生成し、体液量や電解質を調整する。", "腎臓の働きと尿生成の流れを押さえる。"],
  ["115", "2026", "人体構造", "標準", "肺胞で主に行われる働きはどれか。", ["ガス交換", "胆汁生成", "血糖調節", "造血"], 0, "肺胞では酸素と二酸化炭素の交換が行われる。", "呼吸器では気道と肺胞の役割を区別する。"],
  ["115", "2026", "疾病看護", "標準", "心不全患者の状態悪化を示す所見はどれか。", ["体重増加と浮腫", "爪の伸長", "皮膚色の均一化", "食欲の一時的増加"], 0, "心不全では体液貯留により体重増加、浮腫、呼吸困難がみられる。", "毎日の体重測定は心不全管理で重要。"],
  ["115", "2026", "疾病看護", "応用", "脳梗塞急性期の観察で優先度が高いのはどれか。", ["意識レベルと麻痺の変化", "嗜好品の種類", "睡眠中の夢の内容", "衣服の色"], 0, "脳梗塞急性期では神経症状の変化を早期に把握する必要がある。", "意識、瞳孔、麻痺、言語障害を重点的に観察する。"],
  ["115", "2026", "社会保障", "基礎", "地域包括ケアシステムで重視されるのはどれか。", ["住み慣れた地域で生活を支える", "医療を病院内だけで完結させる", "介護予防を行わない", "家族支援を除外する"], 0, "地域包括ケアは医療、介護、予防、住まい、生活支援を一体的に支える考え方である。", "地域包括ケアの5要素を覚える。"],
  ["115", "2026", "社会保障", "標準", "要介護認定の申請先として適切なのはどれか。", ["市町村", "税務署", "保健所のみ", "年金事務所"], 0, "介護保険の要介護認定は市町村に申請する。", "介護保険の保険者と申請手続きを確認する。"],
  ["115", "2026", "在宅看護", "基礎", "訪問看護で利用者の意思決定を支援する対応はどれか。", ["選択肢を説明して希望を確認する", "看護師が一方的に決める", "家族の意見だけを採用する", "説明を省略する"], 0, "在宅看護では本人の生活目標と意思を尊重する。", "意思決定支援は在宅看護の基本。"],
  ["115", "2026", "在宅看護", "標準", "在宅酸素療法中の説明で適切なのはどれか。", ["火気を近づけない", "流量を自由に変更する", "機器の点検は不要である", "外出を必ず禁止する"], 0, "酸素は燃焼を助けるため火気厳禁であり、流量は指示を守る。", "HOTでは火気、流量、停電時対応を確認する。"],
  ["114", "2025", "必修", "基礎", "転倒予防で適切なのはどれか。", ["床の障害物を取り除く", "ナースコールを遠ざける", "夜間照明を完全に消す", "履き物を不安定にする"], 0, "転倒予防では環境整備、履き物、ナースコールの位置確認が重要である。", "転倒リスク因子と予防策を結びつける。"],
  ["114", "2025", "必修", "標準", "感染性廃棄物の扱いで適切なのはどれか。", ["規定の容器に分別する", "一般ごみに混ぜる", "病室内に長期保管する", "素手で圧縮する"], 0, "感染性廃棄物は施設の規定に従い、専用容器へ分別する。", "廃棄物処理は感染予防と医療安全の両方に関わる。"],
  ["114", "2025", "人体構造", "標準", "血液凝固に主に関与する血球成分はどれか。", ["血小板", "赤血球", "好中球", "リンパ球"], 0, "血小板は止血と血液凝固に重要な役割をもつ。", "赤血球、白血球、血小板の働きを区別する。"],
  ["114", "2025", "人体構造", "基礎", "食物の消化吸収が主に行われる部位はどれか。", ["小腸", "食道", "膀胱", "気管"], 0, "小腸は消化と栄養吸収の中心となる器官である。", "消化管の順序と各部位の役割を確認する。"],
  ["114", "2025", "疾病看護", "標準", "糖尿病患者の低血糖症状として考えられるのはどれか。", ["冷汗と手指振戦", "黄疸", "徐脈のみ", "皮膚硬化"], 0, "低血糖では冷汗、振戦、動悸、空腹感、意識障害などがみられる。", "低血糖時の対応もあわせて覚える。"],
  ["114", "2025", "疾病看護", "応用", "慢性腎臓病患者の生活指導で重要なのはどれか。", ["医師の指示に基づく塩分管理", "水分を無制限に摂る", "服薬を自己判断で中止する", "血圧測定を避ける"], 0, "慢性腎臓病では血圧管理、食事療法、服薬継続が重要である。", "腎機能、血圧、食事管理を関連づける。"],
  ["114", "2025", "社会保障", "基礎", "公的医療保険の説明で適切なのはどれか。", ["医療費負担を社会で支える制度である", "全額を常に自己負担する制度である", "介護サービスだけを対象とする", "予防接種を禁止する制度である"], 0, "公的医療保険は医療費負担を社会全体で支える仕組みである。", "医療保険と介護保険を区別する。"],
  ["114", "2025", "社会保障", "標準", "患者の個人情報の取り扱いで適切なのはどれか。", ["業務上必要な範囲で共有する", "SNSに投稿する", "廊下で大声で話す", "許可なく第三者へ渡す"], 0, "個人情報は守秘義務に基づき、必要な範囲で適切に取り扱う。", "守秘義務と情報共有の範囲を確認する。"],
  ["114", "2025", "在宅看護", "標準", "訪問看護計画の立案で重視するのはどれか。", ["本人と家族の希望", "看護師の都合のみ", "近隣の評判のみ", "医療機器の価格のみ"], 0, "在宅では本人・家族の希望、生活状況、医療ニーズを踏まえて計画する。", "在宅看護計画は生活の場に合わせる。"],
  ["114", "2025", "在宅看護", "応用", "在宅で経管栄養を行う家族への指導で適切なのはどれか。", ["注入時の体位を確認する", "チューブ位置確認を省略する", "器具を洗浄しない", "発熱時も連絡しない"], 0, "経管栄養では体位、チューブ位置、注入速度、清潔管理を確認する。", "誤嚥予防と清潔操作が重要。"],
  ["113", "2024", "必修", "基礎", "呼吸困難を訴える患者にまず確認するのはどれか。", ["呼吸状態と酸素飽和度", "好きな食べ物", "家族構成のみ", "靴のサイズ"], 0, "呼吸困難では呼吸数、呼吸様式、SpO2、チアノーゼなどを確認する。", "ABCの視点で優先順位を考える。"],
  ["113", "2024", "必修", "標準", "患者確認で適切なのはどれか。", ["氏名と生年月日など複数情報で確認する", "病室番号だけで確認する", "顔を覚えていれば確認しない", "同室者に確認してもらう"], 0, "患者確認は複数の識別情報で行い、誤認を防止する。", "投薬、採血、処置前の確認が重要。"],
  ["113", "2024", "人体構造", "基礎", "血糖を下げるホルモンはどれか。", ["インスリン", "アドレナリン", "サイロキシン", "アルドステロン"], 0, "インスリンは血糖を低下させるホルモンである。", "インスリンとグルカゴンを対比する。"],
  ["113", "2024", "人体構造", "標準", "肝臓の働きとして適切なのはどれか。", ["解毒と胆汁生成", "尿の貯留", "ガス交換", "骨格筋収縮"], 0, "肝臓は代謝、解毒、胆汁生成、血糖調節などに関与する。", "肝機能検査項目も合わせて確認する。"],
  ["113", "2024", "疾病看護", "応用", "肺炎患者で観察すべき所見はどれか。", ["発熱と喀痰の性状", "視力の左右差のみ", "爪の長さ", "髪質"], 0, "肺炎では発熱、咳嗽、喀痰、呼吸状態、SpO2を観察する。", "呼吸器感染症では酸素化の評価が重要。"],
  ["113", "2024", "疾病看護", "標準", "術後の深部静脈血栓症予防で適切なのはどれか。", ["早期離床を促す", "下肢運動を禁止する", "水分摂取を必ず禁止する", "弾性ストッキングを自己判断で外す"], 0, "DVT予防では早期離床、下肢運動、弾性ストッキングなどが用いられる。", "肺塞栓の危険も関連づける。"],
  ["113", "2024", "社会保障", "基礎", "インフォームド・コンセントで重要なのはどれか。", ["十分な説明と同意", "説明を省略した同意", "医療者のみの決定", "記録を残さないこと"], 0, "治療や検査では十分な説明を受け、本人が同意することが重要である。", "自己決定権と説明責任を確認する。"],
  ["113", "2024", "社会保障", "標準", "虐待が疑われる高齢者への対応で適切なのはどれか。", ["関係機関へ相談し安全を確保する", "本人の訴えを無視する", "家族だけに任せる", "記録を残さない"], 0, "虐待が疑われる場合は安全確保、記録、関係機関との連携が必要である。", "高齢者虐待防止法の趣旨を押さえる。"],
  ["113", "2024", "在宅看護", "基礎", "在宅療養者の服薬支援で適切なのはどれか。", ["服薬状況と残薬を確認する", "自己判断で中止を勧める", "薬袋を捨てる", "副作用を確認しない"], 0, "在宅では服薬状況、残薬、副作用、管理方法を確認する。", "多剤併用や飲み忘れへの支援を考える。"],
  ["113", "2024", "在宅看護", "標準", "家族介護者への支援で適切なのはどれか。", ["介護負担と休息状況を確認する", "相談先を伝えない", "介護方法を説明しない", "家族の不安を否定する"], 0, "家族介護者の負担や不安を把握し、必要な社会資源につなげる。", "レスパイトケアも関連づける。"],
  ["112", "2023", "必修", "基礎", "清潔操作で適切なのはどれか。", ["清潔区域を汚染しないよう扱う", "滅菌物を素手で触る", "使用期限を確認しない", "濡れた滅菌物を使用する"], 0, "清潔操作では滅菌物の汚染防止と使用期限確認が必要である。", "滅菌と消毒の違いを押さえる。"],
  ["112", "2023", "必修", "標準", "意識レベルの確認で用いられるのはどれか。", ["JCS", "BMI", "HbA1c", "GFR"], 0, "JCSは日本で用いられる意識障害の評価尺度である。", "JCSとGCSの違いを確認する。"],
  ["112", "2023", "人体構造", "基礎", "骨格筋を収縮させる主な神経はどれか。", ["運動神経", "感覚神経", "副交感神経のみ", "迷走神経のみ"], 0, "骨格筋の随意運動は運動神経により支配される。", "運動神経と感覚神経を区別する。"],
  ["112", "2023", "人体構造", "標準", "心臓の左心室から出る血管はどれか。", ["大動脈", "肺動脈", "肺静脈", "上大静脈"], 0, "左心室から大動脈へ血液が送り出され、全身へ循環する。", "心臓内の血液の流れを図で確認する。"],
  ["112", "2023", "疾病看護", "応用", "褥瘡のリスクを高める要因はどれか。", ["低栄養", "適切な体位変換", "皮膚の清潔保持", "除圧用具の使用"], 0, "低栄養、湿潤、圧迫、ずれは褥瘡リスクを高める。", "ブレーデンスケールの評価項目を確認する。"],
  ["112", "2023", "疾病看護", "標準", "喘息発作時にみられやすい所見はどれか。", ["喘鳴", "黄疸", "血尿", "徐脈のみ"], 0, "気道狭窄により喘鳴、呼吸困難、咳嗽がみられる。", "喘息発作時は呼吸状態とSpO2を確認する。"],
  ["112", "2023", "社会保障", "基礎", "訪問看護ステーションの説明で適切なのはどれか。", ["在宅療養者へ看護を提供する", "入院患者だけを対象とする", "薬局業務のみを行う", "介護保険と無関係である"], 0, "訪問看護ステーションは在宅療養者に看護を提供する事業所である。", "医療保険と介護保険の訪問看護を整理する。"],
  ["112", "2023", "社会保障", "標準", "障害者総合支援法の目的に含まれるのはどれか。", ["障害者の日常生活と社会生活を支援する", "医療職だけを支援する", "高齢者医療費だけを扱う", "教育制度を廃止する"], 0, "障害者総合支援法は障害者の自立した日常生活・社会生活を支援する。", "障害福祉サービスの概要を確認する。"],
  ["112", "2023", "在宅看護", "基礎", "在宅での感染予防で適切なのはどれか。", ["ケア前後に手指衛生を行う", "使用物品を共用し続ける", "排泄物処理後に手を洗わない", "発熱を記録しない"], 0, "在宅でも手指衛生、物品管理、排泄物処理が感染予防の基本である。", "家庭環境で実行できる方法を考える。"],
  ["112", "2023", "在宅看護", "標準", "終末期在宅療養で重視するのはどれか。", ["本人の希望と苦痛緩和", "治療方針を説明しない", "家族支援を行わない", "生活環境を確認しない"], 0, "終末期在宅療養では本人の意思、苦痛緩和、家族支援が重要である。", "ACPと緩和ケアを関連づける。"],
  ["111", "2022", "必修", "基礎", "血圧測定で適切なのはどれか。", ["測定部位を心臓の高さにする", "マンシェットを衣服の上に巻く", "会話しながら測定する", "測定前に激しい運動を促す"], 0, "血圧測定では安静、適切なマンシェット、心臓の高さが重要である。", "測定条件で値が変わることを理解する。"],
  ["111", "2022", "必修", "標準", "誤嚥予防で適切なのはどれか。", ["食事時の姿勢を整える", "臥位で急いで食べる", "嚥下状態を確認しない", "食後すぐに完全臥床にする"], 0, "誤嚥予防では姿勢、食形態、嚥下状態、食後の体位に注意する。", "高齢者看護と摂食嚥下を結びつける。"],
  ["111", "2022", "人体構造", "基礎", "中枢神経に含まれるのはどれか。", ["脳と脊髄", "心臓と肺", "胃と小腸", "腎臓と膀胱"], 0, "中枢神経は脳と脊髄で構成される。", "中枢神経と末梢神経を区別する。"],
  ["111", "2022", "人体構造", "標準", "体温調節の中枢がある部位はどれか。", ["視床下部", "小脳", "延髄のみ", "脊髄後角"], 0, "視床下部は体温、摂食、内分泌などの調節に関わる。", "間脳の働きを整理する。"],
  ["111", "2022", "疾病看護", "標準", "貧血でみられやすい症状はどれか。", ["易疲労感", "多毛", "高熱のみ", "血尿のみ"], 0, "貧血では酸素運搬能低下により倦怠感、息切れ、動悸などがみられる。", "ヘモグロビンと酸素運搬を関連づける。"],
  ["111", "2022", "疾病看護", "応用", "認知症患者への対応で適切なのはどれか。", ["安心できる環境を整える", "強く否定する", "予定を頻繁に変える", "説明を全くしない"], 0, "認知症看護では安心感、環境調整、尊厳の保持が重要である。", "BPSDへの非薬物的対応を確認する。"],
  ["111", "2022", "社会保障", "基礎", "健康日本21の目的に関連するのはどれか。", ["健康寿命の延伸", "医療安全の廃止", "感染症届出の停止", "介護保険の廃止"], 0, "健康日本21は健康寿命の延伸と健康格差の縮小を目指す国民健康づくり運動である。", "健康増進と一次予防を整理する。"],
  ["111", "2022", "社会保障", "標準", "母子保健で行われる支援はどれか。", ["乳幼児健康診査", "要介護認定のみ", "年金裁定のみ", "労災認定のみ"], 0, "母子保健では妊産婦や乳幼児の健康診査、相談、保健指導が行われる。", "母子保健法の主な事業を確認する。"],
  ["111", "2022", "在宅看護", "基礎", "在宅療養者の生活環境を見る視点で適切なのはどれか。", ["動線と転倒リスク", "家具のブランドのみ", "壁紙の好みのみ", "近隣店舗の売上"], 0, "在宅看護では生活動線、転倒リスク、介護スペースなどを確認する。", "住宅環境のアセスメントを具体化する。"],
  ["111", "2022", "在宅看護", "標準", "多職種連携で適切なのはどれか。", ["情報共有と役割分担を行う", "職種間で連絡しない", "本人の目標を共有しない", "記録を残さない"], 0, "在宅療養支援では医師、看護師、介護職、ケアマネジャーなどの連携が重要である。", "カンファレンスと情報共有の目的を押さえる。"]
].map((item, index) => ({
  id: `past-${item[0]}-${index + 1}`,
  source: "過去問対策",
  exam: `第${item[0]}回`,
  year: item[1],
  yearKey: item[0],
  category: item[2],
  difficulty: item[3],
  question: item[4],
  options: item[5],
  answer: item[6],
  explanation: item[7],
  note: item[8]
}));

const aiTemplates = [
  {
    category: "必修",
    stems: ["感染予防の標準予防策で正しいのはどれか。", "転倒リスクの高い患者への対応で最も適切なのはどれか。"],
    options: [
      ["手指衛生をケアの前後に行う", "手袋をすれば手洗いは不要である", "発熱時のみ標準予防策を行う", "血液に触れなければ防護具は不要である"],
      ["ベッド周囲の障害物を取り除く", "夜間は照明を完全に消す", "歩行補助具を遠ざける", "ナースコールを手の届かない場所に置く"]
    ],
    answers: [0, 0],
    points: ["標準予防策はすべての患者を対象とし、手指衛生が基本である。", "転倒予防では環境整備、動線確保、呼び出し手段の確保が重要である。"]
  },
  {
    category: "人体構造",
    stems: ["腎臓の主な働きとして正しいのはどれか。", "肺胞で主に行われる働きはどれか。"],
    options: [["尿を生成し体液を調整する", "胆汁を貯蔵する", "血糖を直接分解する", "食物を機械的に粉砕する"], ["ガス交換", "胆汁生成", "尿濃縮", "血球産生"]],
    answers: [0, 0],
    points: ["腎臓は尿生成、電解質調整、酸塩基平衡の維持に関わる。", "肺胞は酸素と二酸化炭素のガス交換が行われる部位である。"]
  },
  {
    category: "疾病看護",
    stems: ["心不全患者の観察項目で重要なのはどれか。", "脳梗塞急性期の看護で優先される観察はどれか。"],
    options: [["体重増加と浮腫", "爪の長さのみ", "髪色の変化", "嗜好品の銘柄"], ["意識レベルと麻痺の変化", "趣味の変化", "食器の好み", "病室の方角"]],
    answers: [0, 0],
    points: ["心不全では体重増加、浮腫、呼吸困難、尿量の変化を観察する。", "脳梗塞急性期では意識、瞳孔、麻痺、バイタルサインの変化を観察する。"]
  },
  {
    category: "社会保障",
    stems: ["地域包括ケアシステムで重視される考え方はどれか。", "医療保険制度に関する説明で適切なのはどれか。"],
    options: [["住み慣れた地域で生活を支える", "病院だけで生活支援を完結する", "家族支援を制度から除外する", "予防活動を行わない"], ["公的医療保険により医療費負担を支える", "全額を常に自己負担する", "保険証は介護施設だけで使う", "予防接種は制度と無関係である"]],
    answers: [0, 0],
    points: ["地域包括ケアは医療、介護、予防、住まい、生活支援を一体的に提供する考え方である。", "公的医療保険は医療費負担を社会全体で支える制度である。"]
  },
  {
  category: "在宅看護",
    stems: ["訪問看護で利用者の自己決定を支える対応はどれか。", "在宅療養者の家族支援で適切なのはどれか。"],
    options: [["選択肢を説明し意思を確認する", "看護師がすべて決定する", "本人の希望を聞かない", "家族の都合のみを優先する"], ["介護負担と休息状況を確認する", "家族の訴えを聞かない", "介護方法を説明しない", "相談先を知らせない"]],
    answers: [0, 0],
    points: ["在宅看護では本人の生活目標、意思決定、多職種連携を重視する。", "家族介護者の負担や休息状況を把握し、必要な支援につなげる。"]
  }
];

const APP_STORAGE_KEYS = {
  aiProvider: "nurseExamAiProvider",
  backendUrl: "nurseExamBackendUrl"
};
const DEFAULT_BACKEND_URL = "https://nurse-exam-review-backend.vercel.app";
const AI_BATCH_SIZE = 5;

const BUILT_IN_YEARS = [
  ["all", "直近5回すべて"],
  ["115", "第115回（2026年）"],
  ["114", "第114回（2025年）"],
  ["113", "第113回（2024年）"],
  ["112", "第112回（2023年）"],
  ["111", "第111回（2022年）"]
];

const state = {
  mode: "past",
  category: "all",
  yearFilter: "all",
  difficulty: "基礎",
  aiProvider: localStorage.getItem(APP_STORAGE_KEYS.aiProvider) || "deepseek",
  backendUrl: getStoredBackendUrl(),
  pastPosition: 0,
  aiHistory: [],
  aiPosition: -1,
  aiRefreshing: false,
  aiSerial: 0,
  current: null,
  answers: new Map(),
  mistakes: []
};

const els = {
  modePast: document.querySelector("#modePast"),
  modeAi: document.querySelector("#modeAi"),
  categorySelect: document.querySelector("#categorySelect"),
  yearSelect: document.querySelector("#yearSelect"),
  aiProviderSelect: document.querySelector("#aiProviderSelect"),
  backendStatus: document.querySelector("#backendStatus"),
  difficultyButtons: document.querySelectorAll("[data-difficulty]"),
  prevQuestionBtn: document.querySelector("#prevQuestionBtn"),
  newQuestionBtn: document.querySelector("#newQuestionBtn"),
  aiRefreshBtn: document.querySelector("#aiRefreshBtn"),
  shuffleBtn: document.querySelector("#shuffleBtn"),
  resetBtn: document.querySelector("#resetBtn"),
  sourceBadge: document.querySelector("#sourceBadge"),
  categoryBadge: document.querySelector("#categoryBadge"),
  difficultyBadge: document.querySelector("#difficultyBadge"),
  totalBadge: document.querySelector("#totalBadge"),
  questionNumber: document.querySelector("#questionNumber"),
  questionText: document.querySelector("#questionText"),
  optionsList: document.querySelector("#optionsList"),
  showAnswerBtn: document.querySelector("#showAnswerBtn"),
  saveMistakeBtn: document.querySelector("#saveMistakeBtn"),
  explanationBox: document.querySelector("#explanationBox"),
  explanationText: document.querySelector("#explanationText"),
  jpNote: document.querySelector("#jpNote"),
  doneCount: document.querySelector("#doneCount"),
  accuracyRate: document.querySelector("#accuracyRate"),
  mistakeCount: document.querySelector("#mistakeCount"),
  streakCount: document.querySelector("#streakCount"),
  mistakeList: document.querySelector("#mistakeList"),
  clearMistakesBtn: document.querySelector("#clearMistakesBtn"),
  studyTipText: document.querySelector("#studyTipText")
};

function getAllPastQuestions() {
  return defaultPastQuestions;
}

function getFilteredPastQuestions() {
  return getAllPastQuestions().filter((item) => {
    const categoryMatches = state.category === "all" || item.category === state.category;
    const yearMatches = state.yearFilter === "all" || item.yearKey === state.yearFilter;
    return categoryMatches && yearMatches;
  });
}

function renderYearOptions() {
  els.yearSelect.innerHTML = "";
  BUILT_IN_YEARS.forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    els.yearSelect.appendChild(option);
  });

  if (!BUILT_IN_YEARS.some(([value]) => value === state.yearFilter)) state.yearFilter = "all";
  els.yearSelect.value = state.yearFilter;
}

function normalizeAnswer(rawAnswer, options) {
  if (rawAnswer === undefined || rawAnswer === null || rawAnswer === "") return null;
  if (Number.isInteger(rawAnswer)) return rawAnswer;
  if (typeof rawAnswer === "number") return Math.trunc(rawAnswer);
  if (typeof rawAnswer !== "string") return null;

  const trimmed = rawAnswer.trim();
  const letterIndex = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(trimmed.toUpperCase());
  if (letterIndex >= 0) return letterIndex;

  const numeric = Number(trimmed);
  if (Number.isInteger(numeric)) return numeric >= 1 ? numeric - 1 : numeric;

  const optionIndex = options.findIndex((option) => option === trimmed);
  return optionIndex >= 0 ? optionIndex : null;
}

async function createAiQuestion(batchIndex = 1, batchTotal = 1) {
  const batchLabel = batchTotal > 1 ? `（${batchIndex}/${batchTotal}）` : "";
  setBackendStatus(`${providerLabel(state.aiProvider)}でAI問題を生成中...${batchLabel}`);
  try {
    const data = await requestAiQuestion();
    const provider = data.provider || state.aiProvider;
    const fallbackText = data.fallbackFrom ? `（${providerLabel(data.fallbackFrom)}から切替）` : "";
    setBackendStatus(`${providerLabel(provider)}で生成しました${fallbackText}`);
    return normalizeAiQuestion(data.question || data, provider);
  } catch (error) {
    console.error(error);
    setBackendStatus(`生成失敗: ${error.message}`);
    state.aiSerial += 1;
    return {
      id: `ai-error-${Date.now()}-${state.aiSerial}`,
      source: "AI出題",
      category: state.category === "all" ? "AI" : state.category,
      difficulty: state.difficulty,
      question: "AI出題サーバーに接続できませんでした。少し待って再試行するか、出題APIを切り替えてください。",
      options: ["もう一度試す", "出題APIを切り替える"],
      answer: null,
      explanation: "GitHub PagesだけではAPIキーを安全に使えないため、Gemini / DeepSeekは後端サーバーから呼び出す必要があります。",
      note: error.message
    };
  }
}

async function requestAiQuestion() {
  const payload = {
    provider: state.aiProvider,
    category: state.category === "all" ? "必修・人体構造・疾病看護・社会保障・在宅看護" : state.category,
    difficulty: state.difficulty
  };

  try {
    return await fetchAiQuestion(getBackendEndpoint(state.backendUrl), payload);
  } catch (error) {
    if (normalizeBackendUrl(state.backendUrl) === DEFAULT_BACKEND_URL) throw error;

    state.backendUrl = DEFAULT_BACKEND_URL;
    localStorage.removeItem(APP_STORAGE_KEYS.backendUrl);
    setBackendStatus("正式Backendで再試行中...");
    return fetchAiQuestion(getBackendEndpoint(DEFAULT_BACKEND_URL), payload);
  }
}

async function fetchAiQuestion(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return data;
}

function getBackendEndpoint(backendUrl = state.backendUrl) {
  const base = normalizeBackendUrl(backendUrl).replace(/\/$/, "");
  return base ? `${base}/api/generate-question` : "/api/generate-question";
}

function getStoredBackendUrl() {
  return normalizeBackendUrl(localStorage.getItem(APP_STORAGE_KEYS.backendUrl));
}

function normalizeBackendUrl(value) {
  const url = String(value || "").trim();
  if (!url || url.includes("localhost") || url.includes("127.0.0.1")) {
    return DEFAULT_BACKEND_URL;
  }
  return url;
}

function normalizeAiQuestion(raw, provider) {
  const options = Array.isArray(raw.options) ? raw.options.map(String).slice(0, 6) : [];
  const answer = normalizeAnswer(raw.answer ?? raw.correctAnswer ?? raw.answerIndex, options);
  if (!raw.question || options.length < 2 || answer === null) {
    throw new Error("AI response format is invalid");
  }

  state.aiSerial += 1;
  return {
    id: `ai-${provider}-${Date.now()}-${state.aiSerial}`,
    source: `AI出題｜${providerLabel(provider)}`,
    category: raw.category ? String(raw.category) : (state.category === "all" ? "AI" : state.category),
    difficulty: raw.difficulty ? String(raw.difficulty) : state.difficulty,
    question: String(raw.question),
    options,
    answer,
    explanation: raw.explanation ? String(raw.explanation) : "AIが生成した解説です。",
    note: raw.note ? String(raw.note) : "後端APIから生成された問題です。"
  };
}

function providerLabel(provider) {
  return provider === "deepseek" ? "DeepSeek" : "Gemini";
}

function setBackendStatus(message) {
  els.backendStatus.textContent = message;
}

function getCurrentList() {
  return state.mode === "past" ? getFilteredPastQuestions() : state.aiHistory;
}

function getCurrentPosition() {
  return state.mode === "past" ? state.pastPosition : state.aiPosition;
}

function getCurrentQuestion() {
  const list = getCurrentList();
  if (!list.length) return null;
  return list[getCurrentPosition()];
}

function updateAiRefreshControl() {
  if (!els.aiRefreshBtn) return;
  const isAiMode = state.mode === "ai";
  els.aiRefreshBtn.disabled = !isAiMode || state.aiRefreshing;
  els.aiRefreshBtn.textContent = state.aiRefreshing ? "生成中..." : "出題";
  if (isAiMode) {
    els.prevQuestionBtn.disabled = state.aiRefreshing || state.aiHistory.length < 2;
    els.newQuestionBtn.disabled = state.aiRefreshing || state.aiHistory.length < 2;
  } else {
    els.prevQuestionBtn.disabled = false;
    els.newQuestionBtn.disabled = false;
  }
}

async function refreshAiQuestions() {
  if (state.aiRefreshing) return;
  state.aiRefreshing = true;
  updateAiRefreshControl();

  try {
    const nextQuestions = [];
    for (let index = 0; index < AI_BATCH_SIZE; index += 1) {
      nextQuestions.push(await createAiQuestion(index + 1, AI_BATCH_SIZE));
    }

    state.aiHistory = nextQuestions;
    state.aiPosition = 0;
    setBackendStatus(`${AI_BATCH_SIZE}問のAI問題を更新しました`);
  } finally {
    state.aiRefreshing = false;
    updateAiRefreshControl();
  }
}

async function ensureAiQuestionBatch() {
  if (state.aiHistory.length) {
    state.aiPosition = Math.max(0, Math.min(state.aiPosition, state.aiHistory.length - 1));
    return;
  }
}

function clampPastPosition() {
  const list = getFilteredPastQuestions();
  state.pastPosition = list.length ? Math.min(state.pastPosition, list.length - 1) : 0;
}

async function goNextQuestion() {
  if (state.mode === "past") {
    const list = getFilteredPastQuestions();
    if (!list.length) return;
    state.pastPosition = (state.pastPosition + 1) % list.length;
  } else {
    await ensureAiQuestionBatch();
    if (!state.aiHistory.length) return;
    state.aiPosition = (state.aiPosition + 1) % state.aiHistory.length;
  }
  renderQuestion(getCurrentQuestion());
}

function goPrevQuestion() {
  if (state.mode === "past") {
    const list = getFilteredPastQuestions();
    if (!list.length) return;
    state.pastPosition = (state.pastPosition - 1 + list.length) % list.length;
  } else if (state.aiHistory.length) {
    state.aiPosition = (state.aiPosition - 1 + state.aiHistory.length) % state.aiHistory.length;
  }
  renderQuestion(getCurrentQuestion());
}

async function goRandomQuestion() {
  if (state.mode === "past") {
    const list = getFilteredPastQuestions();
    if (!list.length) return;
    state.pastPosition = Math.floor(Math.random() * list.length);
  } else {
    await ensureAiQuestionBatch();
    if (!state.aiHistory.length) return;
    state.aiPosition = Math.floor(Math.random() * state.aiHistory.length);
  }
  renderQuestion(getCurrentQuestion());
}

function getProgressLabel() {
  const total = getCurrentList().length;
  if (!total) return "0 / 0";
  return `${getCurrentPosition() + 1} / ${total}`;
}

function renderQuestion(question) {
  if (!question) {
    const isAiMode = state.mode === "ai";
    els.sourceBadge.textContent = isAiMode ? "AI出題" : "問題なし";
    els.categoryBadge.textContent = "-";
    els.difficultyBadge.textContent = "-";
    els.totalBadge.textContent = "0 / 0";
    els.questionNumber.textContent = isAiMode ? "AI 0 / 0" : "Q0 / 0";
    els.questionText.textContent = isAiMode ? "「出題」を押すとAI問題を5問生成します。" : "条件に合う問題がありません。分野または年度を変更してください。";
    els.optionsList.innerHTML = "";
    els.explanationBox.hidden = true;
    updateAiRefreshControl();
    renderStats();
    return;
  }

  state.current = question;
  const savedAnswer = state.answers.get(question.id);
  const hasAnswered = savedAnswer !== undefined;

  els.sourceBadge.textContent = question.exam ? `${question.source}｜${question.exam}${question.year ? `（${question.year}年）` : ""}` : question.source;
  els.categoryBadge.textContent = question.category;
  els.difficultyBadge.textContent = question.difficulty;
  els.totalBadge.textContent = getProgressLabel();
  els.questionNumber.textContent = state.mode === "ai" ? `AI ${getProgressLabel()}` : `Q${getProgressLabel()}`;
  els.questionText.textContent = question.question;
  els.explanationBox.hidden = !hasAnswered;
  els.explanationText.textContent = question.explanation;
  els.jpNote.textContent = question.note;
  updateAiRefreshControl();

  els.optionsList.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.innerHTML = `<span class="option-key">${String.fromCharCode(65 + index)}</span><span>${option}</span>`;
    button.addEventListener("click", () => chooseAnswer(index));

    if (hasAnswered && question.answer !== null) {
      if (index === question.answer) button.classList.add("correct");
      if (index === savedAnswer && savedAnswer !== question.answer) button.classList.add("wrong");
    } else if (hasAnswered && index === savedAnswer) {
      button.classList.add("correct");
    }

    els.optionsList.appendChild(button);
  });

  renderStats();
}

function chooseAnswer(index) {
  if (!state.current || state.answers.has(state.current.id)) return;
  state.answers.set(state.current.id, index);
  if (state.current.answer !== null && index !== state.current.answer) addMistake(state.current);
  renderQuestion(state.current);
}

function addMistake(question) {
  const exists = state.mistakes.some((item) => item.id === question.id);
  if (!exists) state.mistakes.unshift(question);
  renderMistakes();
}

function renderStats() {
  const allQuestions = [...getAllPastQuestions(), ...state.aiHistory];
  const answers = [...state.answers.entries()];
  const done = answers.length;
  const correct = answers.filter(([id, selected]) => {
    const question = allQuestions.find((item) => item.id === id);
    return question && question.answer !== null && selected === question.answer;
  }).length;
  const rate = done ? Math.round((correct / done) * 100) : 0;

  els.doneCount.textContent = done;
  els.accuracyRate.textContent = `${rate}%`;
  els.mistakeCount.textContent = state.mistakes.length;
  els.streakCount.textContent = getCurrentStreak();
  updateTip(done);
}

function getCurrentStreak() {
  const allQuestions = [...getAllPastQuestions(), ...state.aiHistory];
  let streak = 0;
  for (const question of allQuestions.slice().reverse()) {
    if (!state.answers.has(question.id)) continue;
    if (question.answer === null) continue;
    if (state.answers.get(question.id) === question.answer) streak += 1;
    else break;
  }
  return streak;
}

function renderMistakes() {
  els.mistakeList.innerHTML = "";
  if (!state.mistakes.length) {
    const empty = document.createElement("li");
    empty.textContent = "まだ苦手問題はありません。";
    els.mistakeList.appendChild(empty);
    return;
  }

  state.mistakes.slice(0, 6).forEach((item) => {
    const li = document.createElement("li");
    const label = item.exam ? `${item.exam}｜` : "";
    li.textContent = `${label}${item.category}｜${item.question}`;
    els.mistakeList.appendChild(li);
  });
}

function updateTip(done) {
  if (done === 0) {
    els.studyTipText.textContent = "まず過去問で出題傾向を確認し、AI出題で弱点を補強しましょう。";
  } else if (state.mistakes.length >= 3) {
    els.studyTipText.textContent = "苦手問題が増えています。同じ分野に絞って10分だけ復習しましょう。";
  } else if (getCurrentStreak() >= 3) {
    els.studyTipText.textContent = "調子が良いです。難易度を上げて、問題文を読む速度も鍛えましょう。";
  } else {
    els.studyTipText.textContent = "解答後すぐに解説を読み、根拠となる語句を確認しましょう。";
  }
}

async function setMode(mode) {
  state.mode = mode;
  els.modePast.classList.toggle("active", mode === "past");
  els.modeAi.classList.toggle("active", mode === "ai");
  els.modePast.setAttribute("aria-selected", String(mode === "past"));
  els.modeAi.setAttribute("aria-selected", String(mode === "ai"));
  updateAiRefreshControl();
  if (mode === "past") clampPastPosition();
  updateAiRefreshControl();
  renderQuestion(getCurrentQuestion());
}

function resetPastPosition() {
  state.pastPosition = 0;
  renderQuestion(getCurrentQuestion());
}

els.modePast.addEventListener("click", () => {
  void setMode("past");
});
els.modeAi.addEventListener("click", () => {
  void setMode("ai");
});

els.categorySelect.addEventListener("change", (event) => {
  state.category = event.target.value;
  resetPastPosition();
});

els.yearSelect.addEventListener("change", (event) => {
  state.yearFilter = event.target.value;
  resetPastPosition();
});

els.aiProviderSelect.value = state.aiProvider;
localStorage.removeItem(APP_STORAGE_KEYS.backendUrl);

els.aiProviderSelect.addEventListener("change", (event) => {
  state.aiProvider = event.target.value;
  localStorage.setItem(APP_STORAGE_KEYS.aiProvider, state.aiProvider);
  setBackendStatus(`${providerLabel(state.aiProvider)}を使用します。「出題」を押すと新しい5問に反映されます。`);
});

els.difficultyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    state.difficulty = button.dataset.difficulty;
    els.difficultyButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    if (state.mode === "ai") {
      setBackendStatus("難易度を変更しました。「出題」を押すと新しい5問に反映されます。");
    }
  });
});

els.prevQuestionBtn.addEventListener("click", goPrevQuestion);
els.newQuestionBtn.addEventListener("click", () => {
  void goNextQuestion();
});
els.aiRefreshBtn.addEventListener("click", async () => {
  await refreshAiQuestions();
  renderQuestion(getCurrentQuestion());
});
els.shuffleBtn.addEventListener("click", () => {
  void goRandomQuestion();
});
els.showAnswerBtn.addEventListener("click", () => {
  if (!state.current) return;
  els.explanationBox.hidden = false;
  [...els.optionsList.children].forEach((button, index) => {
    if (state.current.answer !== null && index === state.current.answer) button.classList.add("correct");
  });
});

els.saveMistakeBtn.addEventListener("click", () => {
  if (!state.current) return;
  addMistake(state.current);
  renderStats();
});

els.clearMistakesBtn.addEventListener("click", () => {
  state.mistakes = [];
  renderMistakes();
  renderStats();
});

els.resetBtn.addEventListener("click", async () => {
  state.answers.clear();
  state.mistakes = [];
  state.pastPosition = 0;
  renderMistakes();
  renderQuestion(getCurrentQuestion());
});

renderYearOptions();
setBackendStatus("AI出題モードで「出題」を押すと5問生成します");
updateAiRefreshControl();
renderMistakes();
renderQuestion(getCurrentQuestion());
