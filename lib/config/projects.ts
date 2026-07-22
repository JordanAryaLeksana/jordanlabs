import { GITHUB_URL } from "@/lib/config/links";
import { PROJECT_IDS } from "@/lib/tools/types";

export const PROJECTS = [
  {
    id: PROJECT_IDS.emqnet, slug: PROJECT_IDS.emqnet, title: "EMQNET", category: "Deep Learning", tags: ["AI", "Research", "Earthquake precursors"], featured: true, status: "Research project", role: "Deep learning pipeline developer", thumbnail: "/illustrations/samsan-tech.png", repositoryUrl: `${GITHUB_URL}/EMQNET`,
    shortDescription: "A multi-task deep learning pipeline using electromagnetic data to explore earthquake precursor signals.",
    overview: { problem: "Earthquake precursor analysis involves signals with multiple prediction targets and difficult-to-interpret patterns.", approach: "EMQNET uses a CNN pipeline with three classification heads for precursor detection, earthquake magnitude, and azimuth direction.", contribution: "Jordan designed and developed the multi-task pipeline using electromagnetic data from BMKG." },
    architecture: "A shared convolutional representation feeds three task-specific classification heads. The project is implemented as a Python and PyTorch deep learning workflow.",
    dataset: "The project uses electromagnetic data from BMKG. Further dataset size, split, and preprocessing details are not publicly documented in the available sources.",
    training: "The documented workflow is a PyTorch neural-network training pipeline. Hyperparameters and experiment counts are not publicly documented yet.",
    evaluation: "Evaluation details are not publicly documented yet. The three prediction targets define the areas that require separate task-level evaluation.",
  },
  {
    id: PROJECT_IDS.dermsight, slug: PROJECT_IDS.dermsight, title: "DermSight", category: "Computer Vision", tags: ["AI", "CNN", "Screening support"], featured: true, status: "Prototype", role: "Computer vision developer", thumbnail: "/illustrations/sandbox-swing.png", repositoryUrl: `${GITHUB_URL}/DermSight`,
    shortDescription: "An AI-assisted skin disease classification system designed to support early screening from dermatology images.",
    overview: { problem: "Early skin screening requires image classification that produces clear outputs while acknowledging the limits of an AI-assisted tool.", approach: "DermSight applies a CNN image-classification workflow with preprocessing and augmentation to improve robustness and generalization.", contribution: "Jordan developed and trained the computer-vision system and framed it as diagnostic support rather than a replacement for clinical judgment." },
    architecture: "The documented system is a Python computer-vision workflow built around CNN classification, image preprocessing, augmentation, and OpenCV utilities.",
    dataset: "The project uses dermatology image data. Publicly available sources do not document the dataset size, class split, or provenance in sufficient detail.",
    training: "Training includes preprocessing and augmentation intended to improve model robustness and generalization. Specific hyperparameters are not publicly documented yet.",
    evaluation: "Evaluation details are not publicly documented yet. The next useful step is a transparent class-level evaluation before any user-facing deployment.",
  },
] as const;

export type Project = (typeof PROJECTS)[number];
