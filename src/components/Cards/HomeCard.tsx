"use client";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Picture from "../picture/Picture";
import Link from "next/link";
import { convertToSlug } from "@constants";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";

interface HomeCardProps {
  id: string;
  image: string | undefined;
  name: string;
}

const HomeCard = ({ id, image, name }: HomeCardProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCategoryClick = (name: string, id: number) => {
    const categorySlugId = `${convertToSlug(name) + "-" + id}`;
    dispatch(updateCategorySlugId({ categorySlugId }));
    router.push(`/category/${convertToSlug(name) + "-" + id}`);
  };
  return (
    <Link
      href={`${"/category/" + convertToSlug(name) + "-" + id}`}
      onClick={() => handleCategoryClick(name, Number(id))}
      className="flex flex-col gap-2 items-center w-full max-md:min-w-[120px] max-md:max-w-[120px] relative overflow-hidden rounded-2xl group cursor-pointer border shadow-lg p-4"
    >
      <Picture
        src={image || "/images/home-img-2.png"}
        alt={`${name}-img`}
        className="min-w-[80px] sm:min-w-[120px] slg:h-24 object-contain object-center w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      <div className="absolute bottom-4 left-4">
        <span className="bg-primary px-4 py-2 rounded-lg text-xs text-white shadow-md">
          {name}
        </span>
      </div>
    </Link>
  );
};

export default HomeCard;
