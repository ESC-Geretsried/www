import { useStaticQuery, graphql } from "gatsby";

type Translations = Omit<
  GatsbyTypes.TranslationYaml,
  "id" | "parent" | "children" | "internal"
>;

export const useTranslation = (
  keys: keyof Translations | Array<keyof Translations>
) => {
  const translation = useStaticQuery<GatsbyTypes.GetTranslationQuery>(graphql`
    query GetTranslation {
      translationYaml {
        contact
        menu
        oclock
        adverbIn
        weekdays
        address
      }
    }
  `);
  if (translation.translationYaml) {
    if (Array.isArray(keys)) {
      return Object.entries(translation.translationYaml)
        .filter(([key, _trans]) => keys.includes(key as keyof Translations))
        .map(([_key, value]) => value);
    }

    return [translation.translationYaml[keys]];
  }
  return ["no Translation found"];
};
