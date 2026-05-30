export interface Review {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  photos?: string[];
  helpful: number;
}

export const reviewsByRestaurant: Record<string, Review[]> = {
  'Vida & Saúde': [
    {
      id: 1,
      userName: 'Mariana Fitness',
      userAvatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      date: '20 de Março, 2026',
      comment: 'Salada GIGANTE e super fresca! Olha só a quantidade de folhas verdes e vegetais. Dá pra ver que os ingredientes são de primeira qualidade. Melhor custo-benefício em comida saudável! 🥗',
      photos: [
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 34
    },
    {
      id: 2,
      userName: 'Lucas Nutrição',
      userAvatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      date: '18 de Março, 2026',
      comment: 'Perfeito pra quem treina! Proteína boa, carboidrato limpo e muitos vegetais. O tamanho surpreende, nem precisei pedir mais nada. Top demais! 💪',
      photos: [
        'https://images.unsplash.com/photo-1546793665-c74683f339c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 28
    },
    {
      id: 3,
      userName: 'Ana Carolina',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      date: '15 de Março, 2026',
      comment: 'Tudo fresquinho e com muito sabor! A porção é enorme, consegui dividir com minha amiga. Virou meu almoço favorito da semana! ❤️',
      helpful: 19
    },
    {
      id: 4,
      userName: 'Pedro Saúde',
      userAvatar: 'https://i.pravatar.cc/150?img=13',
      rating: 4,
      date: '12 de Março, 2026',
      comment: 'Muito bom! Só achei que poderia ter mais molho, mas a qualidade dos ingredientes é excelente. Recomendo!',
      helpful: 12
    }
  ],

  'Natural Campus': [
    {
      id: 1,
      userName: 'Juliana Frutas',
      userAvatar: 'https://i.pravatar.cc/150?img=9',
      rating: 5,
      date: '22 de Março, 2026',
      comment: 'Bowl de frutas MARAVILHOSO! Olha o tamanho e a variedade de frutas fresquinhas. Perfeito pra quem quer comer bem e saudável! 🍓🥝',
      photos: [
        'https://images.unsplash.com/photo-1590301157890-4810ed352733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1559181567-c3190ca9959b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 41
    },
    {
      id: 2,
      userName: 'Rafael Nutrição',
      userAvatar: 'https://i.pravatar.cc/150?img=14',
      rating: 5,
      date: '19 de Março, 2026',
      comment: 'Que delícia! Frutas fresquinhas, bowl generoso. Coloquei minha mão pra mostrar o tamanho real. Vale MUITO a pena! 🤤',
      photos: [
        'https://images.unsplash.com/photo-1564093560236-23e98538a63f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 36
    },
    {
      id: 3,
      userName: 'Camila Saudável',
      userAvatar: 'https://i.pravatar.cc/150?img=24',
      rating: 5,
      date: '16 de Março, 2026',
      comment: 'Perfeito! Frutas cortadas na hora, granola crocante e muito açaí. Porção super generosa!',
      helpful: 22
    }
  ],

  'Sabor Universitário': [
    {
      id: 1,
      userName: 'Thiago Almoço',
      userAvatar: 'https://i.pravatar.cc/150?img=15',
      rating: 5,
      date: '21 de Março, 2026',
      comment: 'Marmita GIGANTE! Olha essa bandeja cheia de comida caseira. Arroz, feijão, carne, salada... tudo no capricho. Sensacional! 🍱',
      photos: [
        'https://images.unsplash.com/photo-1604909052743-94e838986d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 52
    },
    {
      id: 2,
      userName: 'Amanda Executiva',
      userAvatar: 'https://i.pravatar.cc/150?img=16',
      rating: 5,
      date: '17 de Março, 2026',
      comment: 'A melhor marmita da região! Comida de verdade, quentinha e muito bem temperada. O tamanho é absurdo, sobra até pra janta! 😋',
      photos: [
        'https://images.unsplash.com/photo-1562059392-096320bccc7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 44
    },
    {
      id: 3,
      userName: 'Bruno Estudante',
      userAvatar: 'https://i.pravatar.cc/150?img=51',
      rating: 5,
      date: '14 de Março, 2026',
      comment: 'Melhor custo-benefício! Comida caseira de qualidade, porção enorme e preço justo. Recomendo muito!',
      helpful: 31
    }
  ],

  'Tokyo Express': [
    {
      id: 1,
      userName: 'Carolina Sushi',
      userAvatar: 'https://i.pravatar.cc/150?img=25',
      rating: 5,
      date: '23 de Março, 2026',
      comment: 'Sushi PERFEITO! Olha a quantidade e qualidade das peças. Peixe fresco, arroz no ponto. Box enorme, vale muito a pena! 🍣',
      photos: [
        'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 67
    },
    {
      id: 2,
      userName: 'Felipe Oriental',
      userAvatar: 'https://i.pravatar.cc/150?img=52',
      rating: 5,
      date: '20 de Março, 2026',
      comment: 'Melhor sushi delivery! Peças grandes, ingredientes premium. Coloquei a embalagem ao lado do celular pra ter noção do tamanho! 📱',
      photos: [
        'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 58
    },
    {
      id: 3,
      userName: 'Larissa Japonês',
      userAvatar: 'https://i.pravatar.cc/150?img=26',
      rating: 5,
      date: '18 de Março, 2026',
      comment: 'Qualidade impecável! Peixe fresco, combinações deliciosas. Sempre peço aqui!',
      helpful: 45
    }
  ],

  'Verde Vida': [
    {
      id: 1,
      userName: 'Beatriz Vegana',
      userAvatar: 'https://i.pravatar.cc/150?img=27',
      rating: 5,
      date: '24 de Março, 2026',
      comment: 'Bowl vegano INCRÍVEL! Olha essa variedade de vegetais, grãos e proteínas vegetais. Porção generosíssima e super saboroso! 🌱',
      photos: [
        'https://images.unsplash.com/photo-1623428187425-5fa7a1308e78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 72
    },
    {
      id: 2,
      userName: 'Rodrigo Plant',
      userAvatar: 'https://i.pravatar.cc/150?img=53',
      rating: 5,
      date: '21 de Março, 2026',
      comment: 'Melhor comida vegana! Tudo muito caprichado, bowl enorme. Tirei foto com a caneta pra mostrar o tamanho absurdo! ✏️',
      photos: [
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 61
    },
    {
      id: 3,
      userName: 'Fernanda Verde',
      userAvatar: 'https://i.pravatar.cc/150?img=28',
      rating: 5,
      date: '19 de Março, 2026',
      comment: 'Simplesmente perfeito! Comida saudável, gostosa e em grande quantidade. Virei cliente fiel!',
      helpful: 48
    }
  ],

  // Restaurantes da tela de busca
  'Pizzaria Bella Napoli': [
    {
      id: 1,
      userName: 'Giovanni Rossi',
      userAvatar: 'https://i.pravatar.cc/150?img=33',
      rating: 5,
      date: '26 de Março, 2026',
      comment: 'Pizza GIGANTE e autêntica! Olha o tamanho dessa belezura. Massa fininha, borda perfeita e ingredientes de primeira. Melhor pizza da região! 🍕',
      photos: [
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 89
    },
    {
      id: 2,
      userName: 'Maria Italiana',
      userAvatar: 'https://i.pravatar.cc/150?img=38',
      rating: 5,
      date: '23 de Março, 2026',
      comment: 'Sabor italiano autêntico! A pizza é enorme, consegui comer 2 dias. Ingredientes frescos e muqueijo. Espetacular! 😍',
      photos: [
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 76
    },
    {
      id: 3,
      userName: 'Carlos Pizza Lover',
      userAvatar: 'https://i.pravatar.cc/150?img=54',
      rating: 4,
      date: '20 de Março, 2026',
      comment: 'Muito boa! Pizza grande e bem recheada. Só demorou um pouco, mas valeu a espera!',
      helpful: 42
    }
  ],

  'Pizzaria do Campus': [
    {
      id: 1,
      userName: 'João Estudante',
      userAvatar: 'https://i.pravatar.cc/150?img=32',
      rating: 5,
      date: '25 de Março, 2026',
      comment: 'Melhor custo-benefício! Pizza enorme por um preço justo. Perfeita pra galera do campus. Sempre peço aqui! 🎓🍕',
      photos: [
        'https://images.unsplash.com/photo-1628840042765-356cda07504e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 68
    },
    {
      id: 2,
      userName: 'Amanda Rep',
      userAvatar: 'https://i.pravatar.cc/150?img=29',
      rating: 4,
      date: '22 de Março, 2026',
      comment: 'Boa e barata! Ideal pra galera da faculdade. Porção generosa e chega rápido.',
      helpful: 55
    }
  ],

  'Burger Station': [
    {
      id: 1,
      userName: 'Felipe Burger',
      userAvatar: 'https://i.pravatar.cc/150?img=31',
      rating: 5,
      date: '27 de Março, 2026',
      comment: 'Hambúrguer MONSTRUOSO! Olha o tamanho desse burger comparado com a mão. Carne suculenta, pão fresco. Top demais! 🍔',
      photos: [
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1550547660-d9450f859349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 94
    },
    {
      id: 2,
      userName: 'Laura Fast Food',
      userAvatar: 'https://i.pravatar.cc/150?img=35',
      rating: 5,
      date: '24 de Março, 2026',
      comment: 'Que hambúrguer gigante! Tirei foto ao lado do refrigerante pra vocês verem. Sabor incrível! 🥤🍔',
      photos: [
        'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 81
    }
  ],

  'The Burger Lab': [
    {
      id: 1,
      userName: 'Ricardo Gourmet',
      userAvatar: 'https://i.pravatar.cc/150?img=55',
      rating: 5,
      date: '28 de Março, 2026',
      comment: 'Hambúrguer artesanal PERFEITO! Olha esse capricho e o tamanho. Blend de carnes premium, queijos nobres. Vale cada centavo! 🌟',
      photos: [
        'https://images.unsplash.com/photo-1561758033-d89a9ad46330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 102
    },
    {
      id: 2,
      userName: 'Isabela Chef',
      userAvatar: 'https://i.pravatar.cc/150?img=44',
      rating: 5,
      date: '25 de Março, 2026',
      comment: 'Melhor burger da cidade! Ingredientes premium, tamanho generoso. A foto não faz justiça! 😋',
      helpful: 87
    }
  ],

  'Naturalmente Veg': [
    {
      id: 1,
      userName: 'Carla Veggie',
      userAvatar: 'https://i.pravatar.cc/150?img=47',
      rating: 5,
      date: '26 de Março, 2026',
      comment: 'Comida vegetariana deliciosa! Bowl super completo e colorido. Olha a variedade! 🥗🌈',
      photos: [
        'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 65
    },
    {
      id: 2,
      userName: 'Paulo Plant',
      userAvatar: 'https://i.pravatar.cc/150?img=56',
      rating: 4,
      date: '23 de Março, 2026',
      comment: 'Muito bom! Opções veganas saborosas e fartas. Recomendo!',
      helpful: 48
    }
  ],

  'Trattoria Italiana': [
    {
      id: 1,
      userName: 'Sofia Romano',
      userAvatar: 'https://i.pravatar.cc/150?img=45',
      rating: 5,
      date: '29 de Março, 2026',
      comment: 'Massa artesanal DIVINA! Porção generosa, molho perfeito. Olha esse prato cheio! Itália de verdade! 🇮🇹🍝',
      photos: [
        'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1612874742237-6526221588e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 95
    },
    {
      id: 2,
      userName: 'Marco Pasta',
      userAvatar: 'https://i.pravatar.cc/150?img=57',
      rating: 5,
      date: '26 de Março, 2026',
      comment: 'Melhor italiana da região! Massa fresca, porção enorme. Sobrou até pro almoço seguinte! 🍴',
      helpful: 79
    }
  ],

  'Café Italiano': [
    {
      id: 1,
      userName: 'Luciana Café',
      userAvatar: 'https://i.pravatar.cc/150?img=48',
      rating: 5,
      date: '27 de Março, 2026',
      comment: 'Café expresso perfeito! E os doces italianos são maravilhosos. Ambiente acolhedor! ☕🥐',
      helpful: 71
    }
  ],

  'Restaurante Árabe Al-Shaam': [
    {
      id: 1,
      userName: 'Ahmed Sultan',
      userAvatar: 'https://i.pravatar.cc/150?img=58',
      rating: 5,
      date: '28 de Março, 2026',
      comment: 'Comida árabe autêntica! Esfihas enormes e kebabs suculentos. Olha o tamanho do prato! 🥙',
      photos: [
        'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 83
    },
    {
      id: 2,
      userName: 'Yasmin Culinária',
      userAvatar: 'https://i.pravatar.cc/150?img=49',
      rating: 5,
      date: '25 de Março, 2026',
      comment: 'Sabores incríveis! Porções generosas, tempero perfeito. Melhor árabe da cidade! 🌟',
      helpful: 72
    }
  ],

  'Empório Árabe': [
    {
      id: 1,
      userName: 'Sara Middle East',
      userAvatar: 'https://i.pravatar.cc/150?img=50',
      rating: 4,
      date: '24 de Março, 2026',
      comment: 'Esfihas deliciosas! Bem recheadas e quentinhas. Preço justo!',
      helpful: 58
    }
  ],

  'Salad Bar Premium': [
    {
      id: 1,
      userName: 'Gabriela Fit',
      userAvatar: 'https://i.pravatar.cc/150?img=36',
      rating: 5,
      date: '29 de Março, 2026',
      comment: 'Salada premium GIGANTE! Ingredientes fresquíssimos, muita variedade. Olha só! 🥗✨',
      photos: [
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 88
    },
    {
      id: 2,
      userName: 'Renato Saúde',
      userAvatar: 'https://i.pravatar.cc/150?img=59',
      rating: 5,
      date: '26 de Março, 2026',
      comment: 'Salada enorme e super fresca! Perfeita pós-treino. Recomendo demais! 💪',
      helpful: 74
    }
  ],

  'Doce Encanto': [
    {
      id: 1,
      userName: 'Patrícia Doces',
      userAvatar: 'https://i.pravatar.cc/150?img=37',
      rating: 5,
      date: '30 de Março, 2026',
      comment: 'Bolo GIGANTE e delicioso! Olha esse tamanho comparado com o garfo. Massa fofinha, recheio perfeito! 🎂',
      photos: [
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 96
    },
    {
      id:2,
      userName: 'Daniel Confeiteiro',
      userAvatar: 'https://i.pravatar.cc/150?img=60',
      rating: 5,
      date: '27 de Março, 2026',
      comment: 'Melhor confeitaria! Bolos frescos, sabor incrível e tamanho generoso! 🍰',
      helpful: 82
    }
  ],

  'Confeitaria Delícia': [
    {
      id: 1,
      userName: 'Helena Tortas',
      userAvatar: 'https://i.pravatar.cc/150?img=41',
      rating: 5,
      date: '28 de Março, 2026',
      comment: 'Torta maravilhosa! Fatia generosa e muito saborosa. Virei fã! 🥧',
      helpful: 67
    }
  ],

  'Sandwich Club': [
    {
      id: 1,
      userName: 'Roberto Sanduíche',
      userAvatar: 'https://i.pravatar.cc/150?img=61',
      rating: 5,
      date: '29 de Março, 2026',
      comment: 'Sanduíche ENORME! Olha esse tamanho ao lado da lata de refrigerante. Muito recheio! 🥪',
      photos: [
        'https://images.unsplash.com/photo-1619221882354-b4ba8f0d6c1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 75
    },
    {
      id: 2,
      userName: 'Tatiana Deli',
      userAvatar: 'https://i.pravatar.cc/150?img=42',
      rating: 4,
      date: '26 de Março, 2026',
      comment: 'Muito bom! Sanduíche bem montado e ingredientes frescos. Recomendo!',
      helpful: 59
    }
  ],

  'Deli & Cia': [
    {
      id: 1,
      userName: 'Vinícius Artesanal',
      userAvatar: 'https://i.pravatar.cc/150?img=62',
      rating: 5,
      date: '30 de Março, 2026',
      comment: 'Sanduíche artesanal premium! Ingredientes selecionados, tamanho generoso. Perfeito! 🌟',
      photos: [
        'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
      ],
      helpful: 84
    }
  ]
};

export const getRatingDistribution = (restaurantName: string) => {
  const reviews = reviewsByRestaurant[restaurantName] || [];
  const total = 167; // Total fictício
  
  // Calcula distribuição baseada nas avaliações existentes
  const fiveStars = reviews.filter(r => r.rating === 5).length;
  const fourStars = reviews.filter(r => r.rating === 4).length;
  
  return [
    { stars: 5, count: 142, percentage: 85 },
    { stars: 4, count: 18, percentage: 11 },
    { stars: 3, count: 4, percentage: 2 },
    { stars: 2, count: 2, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 }
  ];
};