export interface CustomerReview {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
}

export const customerReviews: CustomerReview[] = [
    {
        id: 1,
      name: "Sarah Johnson",
      avatar: "https://www.giva.co/cdn/shop/files/Frame_1000009460_1.jpg?v=1744794541&width=1500",
      rating: 5,
      comment: "The quality of the jewelry is exceptional. I've received so many compliments on my necklace!",
      date: "March 15, 2024"
    },
    {
        id: 2,
      name: "Michael Chen",
      avatar: "https://www.giva.co/cdn/shop/files/Solitaires_9c6a2bb2-0417-40ec-8b79-a566dd99071a.jpg?v=1744792940&width=1500",
      rating: 5,
      comment: "Fast shipping and beautiful packaging. The earrings I ordered for my wife were perfect!",
      date: "March 10, 2024"
    },
    {
        id: 3,
      name: "Emily Rodriguez",
      avatar: "https://www.giva.co/cdn/shop/files/web_Size_1_-min.jpg?v=1734188041&width=550",
      rating: 4,
      comment: "Great customer service and the bracelet is exactly as shown in the pictures. Very satisfied!",
      date: "March 5, 2024"
    },
    {
        id: 4,
      name: "John Doe",
      avatar: "https://www.giva.co/cdn/shop/files/Frame_2612078.jpg?v=1744792939&width=300",
      rating: 5,
      comment: "The quality of the jewelry is exceptional. I've received so many compliments on my necklace!",
      date: "March 15, 2024"
    },
    {
        id: 5,
      name: "John Doe",
      avatar: "https://www.giva.co/cdn/shop/files/Frame_2612078.jpg?v=1744792939&width=300",
      rating: 5,
      comment: "The quality of the jewelry is exceptional. I've received so many compliments on my necklace!",
      date: "March 15, 2024"
    },
    {
        id: 6,
      name: "John Doe",
      avatar: "https://www.giva.co/cdn/shop/files/Frame_2612078.jpg?v=1744792939&width=300",
      rating: 5,
      comment: "The quality of the jewelry is exceptional. I've received so many compliments on my necklace!",
      date: "March 15, 2024"
    }
  ]
