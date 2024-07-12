"use client";

import { useParams } from "next/navigation";
import ContentParser from "./ContentParser";
import FeedbackForm from "./FeedbackForm";
import { useEffect, useState } from "react";
import { incrementFaqViews } from "@/services/faqService";
import AuthorAndDateIdentification from "./AuthorAndDateIdentification";

const FaqAccordion = ({
  item,
  admin,
}: {
  item: {
    id: number;
    ask: string;
    slug: string;
    answer: string;
    user: { name: string; avatar: string | null };
    updatedAt: Date;
  };
  admin?: boolean;
}) => {
  const params = useParams();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const handleIncrement = async () => {
    await incrementFaqViews(item.id);
  };
  useEffect(() => {
    const hash = window.location.hash.split("#")[1];
    if (hash && hash === item.slug) {
      const faqElement = document.getElementById(`faq-${item.id}`);
      if (faqElement) {
        if (!admin) handleIncrement();
        const elementPosition =
          faqElement.getBoundingClientRect().top + window.scrollY - 50;
        window.scrollTo({ top: elementPosition, behavior: "smooth" });
        setActiveAccordion(item.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id, item.slug, params]);
  return (
    <>
      <input
        type="checkbox"
        name="my-accordion"
        className="peer"
        checked={activeAccordion === item.id ? true : false}
        onChange={(e) => {
          if (e.target.checked) {
            setActiveAccordion(item.id);
            if (!admin) handleIncrement();
          } else {
            setActiveAccordion(null);
          }
        }}
      />
      <div
        className="collapse-title text-2xl font-bold peer-checked:border-primary peer-checked:bg-primary peer-checked:bg-opacity-10 peer-checked:border peer-checked:rounded-t-box"
        id={`faq-${item.id}`}
      >
        {item.ask}
      </div>
      <div className="collapse-content bg-base-200 border-b border-s border-e border-primary rounded-b-box">
        <div className="pt-6">
          <ContentParser data={item.answer} />
          <div className="divider m-0 p-0"></div>
          <AuthorAndDateIdentification
            name={item.user.name}
            avatar={item.user.avatar}
            date={item.updatedAt}
          />
          {!admin ? <FeedbackForm resource="faq" resourceId={item.id} /> : ""}
        </div>
      </div>
    </>
  );
};

export default FaqAccordion;
