import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

interface UseFuseSearchArgsType {
    query: string;
    fusejs: {
        index: string;
        data: string[];
    };
    fuseOpts?: Fuse.IFuseOptions<string>;
    searchOpts?: Fuse.FuseSearchOptions;
}

interface UseDebounceFuseSearchArgsType extends UseFuseSearchArgsType {
    delay?: number;
}

export const useFuseSearch = ({
    query,
    fusejs,
    fuseOpts,
    searchOpts,
}: UseFuseSearchArgsType) => {
    const [fuseImpl, setFuseImpl] = useState<Fuse<string>>();
    useEffect(() => {
        const fuse = new Fuse(
            fusejs.data,
            fuseOpts,
            Fuse.parseIndex(JSON.parse(fusejs.index))
        );
        setFuseImpl(fuse);
    }, [query, fusejs]);
    const result = useMemo(() => {
        if (!query || !fusejs.data) return [];
        return fuseImpl?.search(query, searchOpts) || [];
    }, [query, fuseImpl]);
    return result;
};

export const useDebounceFuseSearch = ({
    query,
    fusejs,
    fuseOpts,
    searchOpts,
    delay = 500,
}: UseDebounceFuseSearchArgsType) => {
    const [fuseImpl, setFuseImpl] = useState<Fuse<string>>();
    const [debounce, setDebounce] = useState("");

    useEffect(() => {
        const sto = setTimeout(() => {
            setDebounce(query);
        }, delay);
        return () => clearTimeout(sto);
    }, [query]);

    useEffect(() => {
        const fuse = new Fuse(
            fusejs.data,
            fuseOpts,
            Fuse.parseIndex(JSON.parse(fusejs.index))
        );
        setFuseImpl(fuse);
    }, [debounce, fusejs]);

    const result = useMemo(() => {
        if (!debounce || !fusejs.data) return [];
        return fuseImpl?.search(debounce, searchOpts) || [];
    }, [debounce, fuseImpl]);

    return result;
};
