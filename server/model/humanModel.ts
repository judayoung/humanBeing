export interface Demographics {
    gender: string;
    birth: Date;
    race: string;
}

export interface Physical {
    height: number;
    weight: number;
    skeletalMuscle: number;
    bodyFat: number;
}

export interface AminoAcid {
    name: string;
    quantity: number;
}

export interface Protein {
    aminoAcids: AminoAcid[];
}

export interface Bone {
    name: string;
    collagen: Protein;
}

export interface Organ {
    name: string;
    // cells: Protein;
}

export interface Muscle {
    name: string;
    // cells: Protein;
}

export interface Skin {
    name: string;
    // cells: Protein;
}

export interface BloodVessel {
    name: string;
    // cells: Protein;
}

export interface Nerve {
    name: string;
    // cells: Protein;
}

export interface BodyPart {
    name: string;
    bone: Bone[];
    organ: Organ[];
    muscle: Muscle[];
    skin: Skin[];
    bloodVessel: BloodVessel[];
    nerve: Nerve[];
}

export interface Human {
    id: string;
    demographics: Demographics;
    physical: Physical;
    bodyPart: BodyPart[];
}

export class HumanModel implements Human {
    id: string;
    demographics: Demographics;
    physical: Physical;
    bodyPart: BodyPart[];

    constructor(
        id: string,
        demographics: Demographics,
        physical: Physical,
        bodyPart: BodyPart[],
    ) {
        this.id = id;
        this.demographics = demographics;
        this.physical = physical;
        this.bodyPart = bodyPart;
    }
}
