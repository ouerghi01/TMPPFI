export enum TargetAgeRange {
    ALL = 'ALL',
    AGE_12_15 = 'AGE_12_15',
    AGE_14_18 = 'AGE_14_18',
    AGE_15_20 = 'AGE_15_20',
    AGE_16_18 = 'AGE_16_18',
    AGE_16_21 = 'AGE_16_21',
    AGE_19_25 = 'AGE_19_25',
    AGE_14_19 = 'AGE_14_19'
}
export const AGE_LABELS: Record<
    TargetAgeRange,
    { fr: string; en: string; de: string }
> = {
    [TargetAgeRange.ALL]: {
        fr: 'Tous âges',
        en: 'All ages',
        de: 'Alle Altersgruppen'
    },
    [TargetAgeRange.AGE_12_15]: {
        fr: '12–15 ans',
        en: '12–15 years',
        de: '12–15 Jahre'
    },
    [TargetAgeRange.AGE_14_18]: {
        fr: '14–18 ans',
        en: '14–18 years',
        de: '14–18 Jahre'
    },
    [TargetAgeRange.AGE_15_20]: {
        fr: '15–20 ans',
        en: '15–20 years',
        de: '15–20 Jahre'
    },
    [TargetAgeRange.AGE_16_18]: {
        fr: '16–18 ans',
        en: '16–18 years',
        de: '16–18 Jahre'
    },
    [TargetAgeRange.AGE_16_21]: {
        fr: '16–21 ans',
        en: '16–21 years',
        de: '16–21 Jahre'
    },
    [TargetAgeRange.AGE_19_25]: {
        fr: '19–25 ans',
        en: '19–25 years',
        de: '19–25 Jahre'
    },
    [TargetAgeRange.AGE_14_19]: {
        fr: '14–19 ans',
        en: '14–19 years',
        de: '14–19 Jahre'
    }
};
