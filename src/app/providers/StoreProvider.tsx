"use client";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { makeStore, AppStore } from "@/store/store";
import axiosInstance from "@/lib/axiosInstance";
import { Spinner } from "flowbite-react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    const createdStore = makeStore();

    axiosInstance(createdStore.dispatch);
    //createdStore.dispatch

    setStore(createdStore);
  }, []);

  if (!store) {
    return (
      <>
        <div className="text-center">
          <Spinner size="xl"/>
        </div>
      </>
    );
  }

  return <Provider store={store}>{children}</Provider>;
}
