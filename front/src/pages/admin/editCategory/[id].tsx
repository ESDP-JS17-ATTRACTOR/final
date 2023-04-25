import React, {useEffect} from 'react';
import {GetServerSideProps} from "next";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {CategoryMutation} from "../../../../types";
import {useRouter} from "next/router";
import {selectOneCategory} from "@/features/categories/categoriesSlice";
import {editCategory, fetchOneCategory} from "@/features/categories/categoriesThunks";
import CategoryForm from "@/components/UI/Admin/CategoryForm";

interface Props {
    id: string
}

const EditCourse: React.FC<Props> = ({id}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const category = useAppSelector(selectOneCategory);

    useEffect(() => {
        dispatch(fetchOneCategory(id));
    }, [dispatch, id]);

    const onSubmit = async (category: CategoryMutation) => {
        await dispatch(editCategory({id, category}));
        await router.push("/admin/courses");
    };

    return (
        <>
            {category &&
                <CategoryForm
                    onSubmit={onSubmit}
                    exist={category}
                    isEdit
                />}
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.id as string;

    return {
        props: {
            id: id
        }
    }
};

export default EditCourse;