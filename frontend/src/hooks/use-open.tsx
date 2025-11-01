import { useCallback, useState } from "react";

/**
 * A hook that exposes visibility and open/close functions for a sheet.
 * @param initialValue - The initial visibility state of the sheet.
 * @returns An object containing the visibility state and open/close functions.
 */
export const useOpen = (initialValue = false) => {
    const [open, setOpen] = useState(initialValue);

    const onOpenChange = useCallback(
        (_value = !open) => {
            setOpen(_value);
        },
        [open],
    );

    return { open, onOpenChange };
};