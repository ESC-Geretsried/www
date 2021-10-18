import { useStaticQuery, graphql } from "gatsby";

export const useTranslation = (
  key: keyof Omit<
    GatsbyTypes.TranslationYaml,
    "id" | "parent" | "children" | "internal"
  >
) => {
  const translation = useStaticQuery<GatsbyTypes.GetTranslationQuery>(graphql`
    query GetTranslation {
      translationYaml {
        contact
        menu
        test {
          property
        }
      }
    }
  `);
  if (translation.translationYaml) {
    return translation.translationYaml[key];
  }
  return "no Translation found";
};
