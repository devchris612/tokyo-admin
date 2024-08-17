import { Input } from "@/components/ui/input";
import CreateProductModal from "@/modules/products/modals/CreateProductModal";
import { countSongs, getAllSongs } from "./data/songs";
import SongsTable from "@/modules/products/SongsTable";
import Header from "@/components/Header";
import { ITEMS_PER_PAGE } from "@/lib/constants";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page: number;
  };
}) {
  const { page } = searchParams;
  const pageNum = page ? Number(page) : 1;
  const skip = page ? (pageNum - 1) * ITEMS_PER_PAGE : 0;
  const limit = ITEMS_PER_PAGE;
  const allSongs = await getAllSongs(skip, limit);
  const count = await countSongs();

  return (
    <>
      <Header title="Danh sách sản phẩm" />
      <div className="flex items-center justify-end mt-10 mb-10">
        {/* <Input
          type="text"
          placeholder="Tìm kiếm"
          className="w-80"
        /> */}
        <CreateProductModal>Tạo mới</CreateProductModal>
      </div>
      <SongsTable
        songs={allSongs}
        count={count}
      />
    </>
  );
}
