import type {
  SkillCategoryId,
  SkillName,
} from "@/lib/config/skills";

export interface FilterSkillsInput {
  category?: SkillCategoryId;
}

export interface SkillFilterGroup {
  category: SkillCategoryId;
  label: string;
  skills: SkillName[];
}

export interface FilterSkillsOutput {
  kind: "skill-filter-results";

  filters: {
    category?: SkillCategoryId;
  };

  groups: SkillFilterGroup[];

  count: number;

  message: string;
}
