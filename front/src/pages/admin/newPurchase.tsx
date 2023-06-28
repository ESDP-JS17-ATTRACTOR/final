import React from 'react';
import { useAppDispatch } from '@/app/hooks';
import { ApiPurchase } from '../../../types';
import { assignPurchase } from '@/features/purchases/puchasesThunks';
import PurchaseForm from '@/components/UI/Admin/PurchaseForm';

const NewPurchase = () => {
  const dispatch = useAppDispatch();

  const onSubmit = async (purchase: ApiPurchase) => {
    try {
      await dispatch(assignPurchase(purchase));
    } catch (e) {
      throw e;
    }
  };
  return (
    <>
      <PurchaseForm onSubmit={onSubmit} />
    </>
  );
};

export default NewPurchase;
