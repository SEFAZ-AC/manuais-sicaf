import SidebarItem from "./SidebarItem";
import SidebarSubSubItem from "./SidebarSubSubItem";
import SidebarSubItem from "./SidebarSubItem";
import SidebarDivider from "./SidebarDivider";
import {
  getModulesTree,
  getPages,
  getSingleArticles,
} from "@/services/menuService";
import { getFaqs } from "@/services/faqService";

const SidebarContent = async () => {
  const modulesTree = await getModulesTree();
  const pages = await getPages();
  const singleArticles = await getSingleArticles();
  const faqs = await getFaqs();
  const filteredModulesTree = modulesTree.filter(
    (module) =>
      module.articles.length > 0 ||
      module.sections.some((section) => section.articles.length > 0)
  );
  return (
    <ul className="w-full join join-vertical">
      <SidebarItem text="Início" icon="home" link="/" />
      {faqs && faqs?.length > 0 && (
        <SidebarItem
          text="Perguntas Frequentes"
          icon="message-circle"
          link="/faq"
        />
      )}
      {pages &&
        pages?.length > 0 &&
        pages.map(
          (
            page: {
              name: string;
              slug: string;
              icon: string;
            },
            i: number
          ) => (
            <SidebarItem
              key={i}
              text={page.name}
              icon={page.icon}
              link={page.slug}
            />
          )
        )}
      {singleArticles?.length > 0 || filteredModulesTree.length > 0 ? (
        <SidebarDivider text="Módulos" />
      ) : (
        ""
      )}
      {singleArticles &&
        singleArticles?.length > 0 &&
        singleArticles.map(
          (
            article: {
              name: string;
              slug: string;
            },
            i: number
          ) => (
            <SidebarItem
              key={i}
              text={article.name}
              icon="file-text"
              link={article.slug}
            />
          )
        )}
      {filteredModulesTree &&
        filteredModulesTree?.length > 0 &&
        filteredModulesTree.map(
          (
            module: {
              name: string;
              articles: {
                name: string;
                slug: string;
              }[];
              sections: {
                name: string;
                articles: {
                  slug: string;
                  name: string;
                }[];
              }[];
            },
            i: number
          ) => (
            <SidebarItem key={i} text={module.name} icon="folder" dropdown>
              {module.articles &&
                module.articles.map(
                  (
                    article: {
                      name: string;
                      slug: string;
                    },
                    i: number
                  ) => (
                    <SidebarSubItem
                      key={i}
                      text={article.name}
                      icon="file-text"
                      link={article.slug}
                    />
                  )
                )}
              {module.sections &&
                module.sections
                  .filter((section) => section.articles.length > 0)
                  .map(
                    (
                      section: {
                        name: string;
                        articles: {
                          slug: string;
                          name: string;
                        }[];
                      },
                      i: number
                    ) => (
                      <SidebarSubItem
                        key={i}
                        text={section.name}
                        icon="folder"
                        dropdown
                      >
                        {section.articles.map(
                          (
                            article: {
                              name: string;
                              slug: string;
                            },
                            i: number
                          ) => (
                            <SidebarSubSubItem
                              key={i}
                              text={article.name}
                              icon="file-text"
                              link={article.slug}
                            />
                          )
                        )}
                      </SidebarSubItem>
                    )
                  )}
            </SidebarItem>
          )
        )}
    </ul>
  );
};

export default SidebarContent;
