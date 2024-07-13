import SidebarItem from "./SidebarItem";
import SidebarSubSubItem from "./SidebarSubSubItem";
import SidebarSubItem from "./SidebarSubItem";
import SidebarDivider from "./SidebarDivider";
import {
  adGetModulesTree,
  adGetPages,
  adGetSingleArticles,
} from "@/services/menuService";
import { getFaqs } from "@/services/faqService";
import CreateButton from "./CreateButton";

const AdminSidebarContent = async () => {
  const modulesTree = await adGetModulesTree();
  const pages = await adGetPages();
  const singleArticles = await adGetSingleArticles();
  const faqs = await getFaqs();
  const hasActiveArticlesOrSections = (module: any) => {
    const hasActiveModuleArticles = module.articles.some(
      (article: any) => article.active
    );
    const hasActiveSectionArticles = module.sections.some((section: any) =>
      section.articles.some((article: any) => article.active)
    );
    return hasActiveModuleArticles || hasActiveSectionArticles;
  };

  return (
    <ul className="w-full join join-vertical">
      <div className="p-3">
        <CreateButton to="/criar/pagina" text="Página" />
      </div>
      <SidebarItem text="Início" icon="home" link="/" />
      <SidebarItem
        text="Perguntas Frequentes"
        icon="message-circle"
        link="/faq"
        disabled={!faqs.length || faqs.length === 0}
      />
      {pages &&
        pages?.length > 0 &&
        pages.map(
          (
            page: {
              name: string;
              slug: string;
              icon: string;
              active: boolean | null;
            },
            i: number
          ) => (
            <SidebarItem
              key={i}
              text={page.name}
              icon={page.icon}
              link={page.slug}
              disabled={!page.active}
            />
          )
        )}
      <SidebarDivider text="Módulos" />
      <div className="flex items-center p-3 gap-3 justify-center w-full h-full">
        <CreateButton to="/criar/modulo" text="Módulo" />
        <CreateButton to="/criar/secao" text="Seção" />
      </div>
      <div className="p-3">
        <CreateButton to="/criar/manual" text="Manual" />
      </div>
      {singleArticles &&
        singleArticles?.length > 0 &&
        singleArticles.map(
          (
            article: {
              name: string;
              slug: string;
              active: boolean | null;
            },
            i: number
          ) => (
            <SidebarItem
              key={i}
              text={article.name}
              icon="file-text"
              link={article.slug}
              disabled={!article.active}
            />
          )
        )}
      {modulesTree &&
        modulesTree?.length > 0 &&
        modulesTree.map(
          (
            module: {
              name: string;
              active: boolean | null;
              articles: {
                name: string;
                slug: string;
                active: boolean | null;
              }[];
              sections: {
                name: string;
                active: boolean | null;
                articles: {
                  slug: string;
                  name: string;
                  active: boolean | null;
                }[];
              }[];
            },
            i: number
          ) => (
            <SidebarItem
              key={i}
              text={module.name}
              icon="folder"
              disabled={!module.active || !hasActiveArticlesOrSections(module)}
              dropdown
            >
              {module.articles &&
                module.articles.map(
                  (
                    article: {
                      name: string;
                      slug: string;
                      active: boolean | null;
                    },
                    i: number
                  ) => (
                    <SidebarSubItem
                      key={i}
                      text={article.name}
                      icon="file-text"
                      link={article.slug}
                      disabled={!article.active}
                    />
                  )
                )}
              {module.sections &&
                module.sections.map(
                  (
                    section: {
                      name: string;
                      active: boolean | null;
                      articles: {
                        slug: string;
                        name: string;
                        active: boolean | null;
                      }[];
                    },
                    i: number
                  ) => {
                    const allArticlesInactive = section.articles.every(
                      (article) => !article.active
                    );
                    return (
                      <SidebarSubItem
                        key={i}
                        text={section.name}
                        icon="folder"
                        disabled={!section.active || allArticlesInactive}
                        dropdown
                      >
                        {section.articles &&
                          section.articles?.length > 0 &&
                          section.articles.map(
                            (
                              article: {
                                name: string;
                                slug: string;
                                active: boolean | null;
                              },
                              i: number
                            ) => (
                              <SidebarSubSubItem
                                key={i}
                                text={article.name}
                                icon="file-text"
                                link={article.slug}
                                disabled={!article.active}
                              />
                            )
                          )}
                      </SidebarSubItem>
                    );
                  }
                )}
            </SidebarItem>
          )
        )}
    </ul>
  );
};

export default AdminSidebarContent;
