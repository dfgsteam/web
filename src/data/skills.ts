export type SkillLevel = 'master' | 'expert' | 'advanced' | 'medium' | 'beginner';

export interface Skill {
  name: string;
  level: SkillLevel;
  value: number;
}

export const LEVEL_VALUE: Record<SkillLevel, number> = {
  master: 90,
  expert: 80,
  advanced: 65,
  medium: 50,
  beginner: 30,
};

export const skills: Skill[] = [
  { name: 'Python', level: 'master', value: LEVEL_VALUE.master },
  { name: 'SQL', level: 'expert', value: LEVEL_VALUE.expert },
  { name: 'PHP', level: 'expert', value: LEVEL_VALUE.expert },
  { name: 'HTML', level: 'expert', value: LEVEL_VALUE.expert },
  { name: 'MS Office', level: 'master', value: LEVEL_VALUE.master },
  { name: 'WooCommerce', level: 'expert', value: LEVEL_VALUE.expert },
  { name: 'Linux / BASH', level: 'advanced', value: LEVEL_VALUE.advanced },
  { name: 'Java', level: 'advanced', value: LEVEL_VALUE.advanced },
  { name: 'TYPO3', level: 'advanced', value: LEVEL_VALUE.advanced },
  { name: 'C++', level: 'medium', value: LEVEL_VALUE.medium },
  { name: 'Haskell', level: 'beginner', value: LEVEL_VALUE.beginner },
  { name: 'Assembly', level: 'beginner', value: LEVEL_VALUE.beginner },
  { name: 'Photoshop', level: 'beginner', value: LEVEL_VALUE.beginner },
];
