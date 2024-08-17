"use client";
import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Song } from "@/lib/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import CreateProductModal from "./modals/CreateProductModal";
import CreateProductForm from "./forms/CreateProductForm";
import { deleteSongAction } from "@/app/actions.ts/deleteSongAction";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { createEmptyArray, getDisplayPages } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  songs: Song[];
  count: number;
};

function SongsTable({ songs, count }: Props) {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const pages = useMemo(() => {
    return getDisplayPages(Math.ceil(count / ITEMS_PER_PAGE), currentPage, 3);
  }, [count, currentPage, songs]);

  if (songs.length === 0) {
    return (
      <p className="text-muted-foreground text-sm text-center">
        Không tìm thấy bài hát nào
      </p>
    );
  }

  return (
    <div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Tên bài hát</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Ảnh</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song) => (
            <TableRow key={song._id}>
              <TableCell className="font-medium">{song.title}</TableCell>
              <TableCell>{song.description}</TableCell>
              <TableCell>
                <img
                  src={song.imageUrl}
                  alt="song-thumb"
                  className="w-10 h-10"
                />
              </TableCell>
              <TableCell className="text-right">
                <CreateProductModal
                  song={song}
                  className="bg-white hover:bg-transparent text-primary mr-2">
                  <FaRegEdit />
                </CreateProductModal>

                <Button
                  onClick={(e) => {
                    const isConfirmed = window.confirm(
                      "Are you sure to delete this song?"
                    );
                    if (isConfirmed) {
                      deleteSongAction(song._id);
                    }
                  }}
                  className="bg-transparent hover:bg-transparent text-primary">
                  <FaRegTrashAlt />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end">
        {currentPage > 1 ? (
          <Button
            variant={"outline"}
            className="rounded-none"
            asChild>
            <Link href={`/?page=${currentPage - 1}`}>Prev</Link>
          </Button>
        ) : null}
        {pages.map((val) => (
          <Button
            variant={"outline"}
            className={`rounded-none ${
              val === currentPage ? "bg-secondary" : ""
            }`}
            key={`pg-${val}`}
            asChild>
            <Link href={`/?page=${val}`}>{val}</Link>
          </Button>
        ))}
        {currentPage < pages.length ? (
          <Button
            variant={"outline"}
            className="rounded-none"
            asChild>
            <Link href={`/?page=${currentPage + 1}`}>Next</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default SongsTable;
