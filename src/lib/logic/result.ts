import { AnswerOption } from "../data/questions";

type CharacterType = 'SANTA' | 'RUDOLPH' | 'DWARF';
type ModifierType = 'SELF_CARE' | 'SOCIAL' | 'HOMEBODY' | 'EMOTIONAL' | 'PLANNER';

export function calculateResult(answers: AnswerOption[]) {
    const characterScores: Record<CharacterType, number> = { SANTA: 0, RUDOLPH: 0, DWARF: 0 };
    const modifierScores: Record<ModifierType, number> = { SELF_CARE: 0, SOCIAL: 0, HOMEBODY: 0, EMOTIONAL: 0, PLANNER: 0 };

    answers.forEach(answer => {
        characterScores[answer.scores.character]++;
        modifierScores[answer.scores.modifier]++;
    });

    // Find max
    const maxCharacter = (Object.keys(characterScores) as CharacterType[]).reduce((a, b) => characterScores[a] > characterScores[b] ? a : b);
    const maxModifier = (Object.keys(modifierScores) as ModifierType[]).reduce((a, b) => modifierScores[a] > modifierScores[b] ? a : b);

    return {
        character: maxCharacter,
        modifier: maxModifier
    };
}
