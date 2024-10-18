import React from "react";
import ChangePassword from "./ChangePassword";
import ChangeEmailModal from "./ChangeEmailModal";
import ChangeDobModal from "./ChangeDobModal";
import SubscriptionModal from "./SubscriptionModal";
import AccountActionModal from "./AccountActionModal";
import DeleteAccountModal from "./DeleteAccountModal";
import VerifyEmailModal from "./VerifyEmailModal";
import DeleteFinalModal from "./DeleteAccountFinalModal";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative z-50">
        {/* <ChangePassword /> */}
        {/* <ChangeEmailModal /> */}
        {/* <ChangeDobModal /> */}
        {/* <SubscriptionModal />
         */}
         {/* <AccountActionModal /> */}
         {/* <DeleteAccountModal /> */}
         <VerifyEmailModal />
         {/* <DeleteFinalModal /> */}
      </div>
      <div className="fixed inset-0 bg-black opacity-50 pointer-events-none"></div>
    </div>
  );
};

export default Modal;
