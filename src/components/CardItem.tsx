import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiCheck, BiTrash, BiX } from 'react-icons/bi';
import { deleteItemThunkByList, getItemByIdThunk, isBoughtItemThunk } from '@/lib/slices/itemSlice';
import { AppDispatch, RootState } from '@/lib/store';
import { getCategoryByIdThunk } from '@/lib/slices/categorySlice';
import { IItem } from '@/interfaces/IItem';

const CardItem = ({ itemData }: { itemData: IItem }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { itens, item: product, loading, error } = useSelector((state: RootState) => state.item);
    const { categories, loading: loadingCat, error: errorCat } = useSelector((state: RootState) => state.category);

    useEffect(() => {
        if (itemData._id) {
            dispatch(getItemByIdThunk(itemData._id));
        }
    }, [itemData._id, dispatch]);

    const item = itens.find(it => it._id === itemData._id);

    useEffect(() => {
        if (item?.categoryId) {
            dispatch(getCategoryByIdThunk(item.categoryId));
        }
    }, [dispatch, item?.categoryId]);
    
    const category = categories.find(cat => cat._id === item?.categoryId);

    function handleDeleteItemList(){
        dispatch(deleteItemThunkByList({ listId: itemData.listId, itemId: itemData._id }));
    }
    
    function handleBoughtItem(){
        dispatch(isBoughtItemThunk({ listId: itemData.listId, itemId: itemData._id }));
    }
    

    if (loading) {
        return <p>Carregando item...</p>;
    }

    if (error) {
        return <p>Erro ao carregar item: {error}</p>;
    }

    if(item){
        const isBought = item.bought !== undefined ? item.bought : itemData.bought;
        return (
            <div className='border-b p-2 border-purple-500 py-2 flex justify-between items-center w-full gap-3'>
                <p className='w-10 cursor-pointer' onClick={handleBoughtItem}>
                    {isBought ? (
                        <BiCheck size={25} className='text-green-500' />
                    ) : (
                        <BiX size={25} className='text-red-500' />
                    )}
                </p>

                <p className='flex-1'>{itemData.quantity || 1}</p>
                <p className='flex-1'>{item.name}</p>
                <p className='flex-1'>{category?.name}</p>
                <p onClick={handleDeleteItemList} className='flex-1 cursor-pointer'>
                    <BiTrash />
                </p>
            </div>
        );
    }
};

export default CardItem;
