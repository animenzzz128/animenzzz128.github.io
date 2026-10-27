import type { Bi } from './lang';

export type Block = { p: Bi } | { h: Bi } | { list: Bi[] };
export type Note = { slug: string; date: Bi; title: Bi; summary: Bi; project: { name: string; to: string }; body: Block[] };

export const NOTES: Note[] = [
  {
    slug: 'score-by-cost-of-error',
    date: { en: 'Oct 2026', zh: '2026.10' },
    title: { en: 'Score AI extraction by what a mistake costs', zh: '按出错的代价给 AI 抽取打分' },
    summary: { en: 'One accuracy number hid the errors that mattered in TouTouLe. Splitting fields by the cost of an error, and tracking two kinds of failure, did not.', zh: '在投投乐里，一个总准确率掩盖了真正要紧的错误。按出错代价给字段分层，并分开追踪两类失败，才看得清。' },
    project: { name: 'TouTouLe', to: '/projects/toutoule' },
    body: [
      { p: { en: 'TouTouLe reads a job posting and pulls out eligibility, application caps, the deadline and required materials. Not every field is equal. A slightly wrong materials list is an annoyance; a wrong deadline or a missed application cap costs an opportunity. A single accuracy score averages the two together and hides the errors I care about.', zh: '投投乐读一条招聘信息，抽取申请资格、投递上限、截止日期和所需材料。字段的分量并不一样：材料清单略有出入只是麻烦，截止日期错了或漏掉投递上限，就会错过机会。一个总准确率把两者平均在一起，恰好掩盖了我最在意的那类错误。' } },
      { h: { en: 'Tier the fields', zh: '先给字段分层' } },
      { p: { en: 'I marked the fields where an error costs an opportunity as critical, and scored them on their own. Across 50 labeled postings that gave 249 critical values to check.', zh: '我把“错了会错过机会”的字段标为关键字段，单独打分。50 条人工标注的招聘信息里，一共有 249 个关键字段值需要检查。' } },
      { h: { en: 'Count two kinds of failure', zh: '分开数两类失败' } },
      { p: { en: 'For critical fields I track two failures separately, because they pull in opposite directions:', zh: '关键字段上我分开追踪两类失败，因为它们此消彼长：' } },
      { list: [
        { en: 'Hallucination: a value the posting does not support. Target 0 of 249.', zh: '幻觉：原文并不支持的值。目标 0 / 249。' },
        { en: 'False negative: a value the posting states but the agent missed. Target 10% or less.', zh: '漏报：原文写了但没抽到的值。目标不超过 10%。' },
      ] },
      { p: { en: 'The main guard against hallucination is strict: every value must carry a quote, code checks the quote word for word against the posting, and a value that fails becomes “Not stated”. That trades hallucinations for misses, which is exactly why misses need their own number. Eligibility itself is decided by six deterministic rules, not by the model.', zh: '防幻觉的主要手段很严格：每个值都要带原文引用，代码逐字核对，核对不上就记为“未说明”。这等于用漏报换幻觉，所以漏报必须有自己的指标。至于是否符合资格，由六条确定性规则判断，而不是模型。' } },
      { h: { en: 'What the numbers said', zh: '结果怎么样' } },
      { p: { en: 'Against a plain prompt on the same model, critical hallucinations fell from 20 to 8 of 249 in a fresh run (−60%), and misses stayed at 6 of 67, inside the target. Two targets were not met: hallucinations are not zero, and critical accuracy reached 88.7–94.7% against a 95% goal. Both are in the README, because a scorecard that only shows wins is not a scorecard.', zh: '与同模型的普通提示词相比，新一轮运行中关键字段幻觉从 20 / 249 降到 8 / 249（−60%），漏报 6 / 67，在目标之内。也有两项没达标：幻觉没有降到 0，关键准确率在 88.7–94.7%，没到 95%。这两项都写在 README 里，只报喜的记分卡不算记分卡。' } },
      { h: { en: 'What I would change', zh: '如果重来' } },
      { list: [
        { en: 'Hold out a test set before tuning. My prompts were tuned on the same 50 postings they were scored on.', zh: '调提示词之前先留出测试集。我的提示词是在同一批 50 条数据上调、又在上面评的。' },
        { en: 'Label in both languages. English-only labels counted correct Chinese answers as misses.', zh: '标注要覆盖两种语言。只用英文标注，会把正确的中文答案算成漏报。' },
      ] },
    ],
  },
  {
    slug: 'test-the-scorer',
    date: { en: 'Oct 2026', zh: '2026.10' },
    title: { en: 'Test the scorer as hard as the model', zh: '评分器要和模型一样认真测' },
    summary: { en: 'Dayweave’s first AI eval scored 58 of 63. Three of the five failures were a bug in my own validator.', zh: 'Dayweave 第一次 AI 评测得了 58/63，5 个失败里有 3 个是我自己写的校验器的 bug。' },
    project: { name: 'Dayweave', to: '/projects/dayweave' },
    body: [
      { p: { en: 'In Dayweave the model writes the cited daily brief and assignment breakdowns, and parses one-line scheduling requests. Every output goes through a validator before anyone sees it: each sentence must cite records that exist, and every number and time must come from those records.', zh: '在 Dayweave 里，模型负责写带引用的每日简报、拆解作业，以及理解一句话的排程请求。每条输出给人看之前都要过校验器：每句话必须引用真实存在的记录，数字和时间必须来自被引用的记录。' } },
      { h: { en: 'The eval', zh: '评测怎么做' } },
      { p: { en: 'I wrote 21 synthetic cases and ran each three times, 63 runs in all. The cases are the awkward ones: a source that is down, a deadline that moved, the day clocks change, and an email with instructions injected into it.', zh: '我写了 21 个虚构场景，每个跑 3 次，共 63 次。场景都挑难的：数据源中断、截止日期变更、夏令时切换那天，还有一封被注入了指令的邮件。' } },
      { h: { en: 'The surprise', zh: '意外' } },
      { p: { en: 'The first scoring came back 58 of 63. Before touching a prompt I read the five failures one by one. Three of them were correct outputs that my validator rejected. The bug was in the checker, not the model.', zh: '第一次评分是 58/63。动提示词之前，我先把 5 个失败逐个读了一遍，发现其中 3 个其实是正确输出，被我的校验器误判了。问题出在检查的人，而不是模型。' } },
      { p: { en: 'Had I “fixed” those by changing the prompt, I would have taught the model to satisfy a broken rule. Instead I fixed the validator, added regression tests for it, and re-scored the same outputs: 61 of 63. Re-scoring the same outputs matters, because it shows the change came from the scorer and not from a lucky new run.', zh: '如果我当时去改提示词“修”这几个失败，等于教模型去迎合一条有问题的规则。我改的是校验器，给它加了回归测试，然后对同一批输出重新评分：61/63。用同一批输出复评很重要，这样才能说明分数变化来自评分器，而不是新一轮运行碰巧更好。' } },
      { h: { en: 'What I keep doing now', zh: '现在保留的习惯' } },
      { list: [
        { en: 'Read failures before fixing anything. The fix depends on whose fault it is.', zh: '先读失败案例，再动手修。修哪里，取决于是谁的错。' },
        { en: 'Give the checker its own tests, with outputs that should pass and outputs that should fail.', zh: '给校验器单独写测试，既有该通过的输出，也有该被拒的输出。' },
        { en: 'Keep the remaining failures on record. Two still fail, and when a check fails the app falls back to rule-written text.', zh: '剩下的失败要留档。目前还有 2 个没过；校验不通过时，应用会退回规则生成的文本。' },
      ] },
      { p: { en: '21 cases built on one fictional student make a regression set, not a measure of how reliable this would be on real data. That is the next thing to earn.', zh: '21 个场景都基于同一位虚构学生，它是回归测试集，不能说明在真实数据上有多可靠。这是下一步要去证明的。' } },
    ],
  },
];
