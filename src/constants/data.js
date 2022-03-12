import AppImages from "../assets/images";

export const PRICE_RANGE = ["5000", "10000", "20000"];

export const DASHBOARD_TABS = [
    {
        title: "Top-up account",
        description: "Deposit money to your account to use with card",
        icon: AppImages.TopUpAccount
    },
    {
        title: "Weekly spending limit",
        description: "You haven’t set any spending limit on card",
        icon: AppImages.WeeklyLimit,
        screen: "Spending",
        toggle: true,
        key: 'spending'
    },
    {
        title: "Freeze card",
        description: "Your debit card is currently active",
        icon: AppImages.FreezeCard,
        toggle: true,
        key: 'freeze_card'
    },
    {
        title: "Get a new card",
        description: "This deactivates your current debit card",
        icon: AppImages.NewCard
    },
    {
        title: "Deactivated cards",
        description: "Your previously deactivated cards",
        icon: AppImages.DeactivateCard
    }
]