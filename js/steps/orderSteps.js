var orderStepsModule = (function(){
	
    let calculatorConfig;
	let orderSteps;
									
	let getHandleTypeStep = function(stepId, itemCount){
		let handleTypeStepElements = [{
			id:`element-98-2-${stepId}`,
			itemChange:'eventHandleTypes',
			items: []
		}];
									
		for(let i=1; i<itemCount+1; i++){
			let item = {
				id:`item-98-2-${i}-${stepId}`,
				title:i.toString()
			};
											
			handleTypeStepElements[0].items.push(item);
		}

		return {
			id:stepId,
			title:'Тип ручки',
			stepElements:handleTypeStepElements
		}
	};

	let printingTypeStep = function(stepId, photoPrintingPrice, monochromaticPaintingPrice){
	return {
			id:stepId,
			title:'Вид печати',
			doubleWidthSizeInMidle:true,
			calcFunc:'priceMultiplyByAreaSizeCalc',
			stepElements: [
				{
					id:`element-34-${stepId}`,
					items:[
						{
							id:`item-35-${stepId}`,
							title:'Фотопечать',
							info:'Цветное изображение на поверхности стекла. Широко используется в оформлении дизайна интерьера и расширяет спектр применяемых стилевых решений. ',
							isSelected: true,
							price: photoPrintingPrice
						},
						{
							id:`item-36-${stepId}`,
							title:'Однотонная краска',
							info:'Фотопечать на стекле используется в оформлении дизайна интерьера и расширяет спектр применяемых стилевых решений.',
							price: monochromaticPaintingPrice
						},
						{
							id:`item-37-${stepId}`,
							title:'Без печати',
							price:0.00
						}
					]
				},
				{
					id:`element-38-${stepId}`,
					textBlock:'Рисунок на стекло может наносить несколькими способами. Или посредством нанесения на стекло пескоструйной обработки или посредством химического матирования. Цена за квадратный метр может меняться от способа нанесения рисунка и сложности наносимого рисунка'
				}
			]
		}
	}
		
	let glassThicknessStep = function(stepId){
		return {
			id:stepId,
			title:'Толщина стекла',
			stepElements:[
				{
					id:`element-79-${stepId}`,
					items: [
						{
							id:`item-80-${stepId}`,
							title:'8 мм',
							isSelected:true
						},
						{
							id:`item-81-${stepId}`,
							title:'10 мм'
						}
					]
				},
				{
					id:`element-82-${stepId}`,
					textBlock:'От выбранной вами толщины будет зависеть не только цена, но и прочность изделия.'
				}
			]
		}
	}
		
	let glassTypeStep = function(stepId){
		return {
			id:stepId,
			title:'Тип стекла',
			stepElements:[
				{
					id:`element-10-${stepId}`,
					items: [
						{
							id:`item-11-${stepId}`,
							title:'Прозрачное',
							isSelected:true
						},
						{
							id:`item-12-${stepId}`,
							title:'Матовое'
						},
						{
							id:`item-13-${stepId}`,
							title:'Бронзовое'
						},
						{
							id:`item-14-${stepId}`,
							title:'Оптивайт'
						},
						{
							id:`item-15-${stepId}`,
							title:'Серое'
						}
					]
				}
			]
		}
	}
		
	let glassType2Step = function(stepId){
		return {
			id:stepId,
			title:'Тип стекла',
			calcFunc:'priceMultiplyByAreaSizeCalc',
			stepElements:[
				{
					id:`element-1-${stepId}`,
					items: [{
							id:`item-31-${stepId}`,
                            title: 'Обычное',
                            isSelected: true,
							price: calculatorConfig.SKINALI_NORMAL_GLASSTYPE_PRICE,
							info:'Имеет в срезе зеленоватый оттенок. Данный зеленоватый оттенок может искажать цвет нанесенного на стекла изображения фотопечати или иным способом нанесенных изображений'
						},
						{
							id:`item-32-${stepId}`,
							title:'Осветленное',
							price: calculatorConfig.SKINALI_CLARIFIED_GLASSTYPE_PRICE,
							info:'Характеризуется стопроцентной прозрачностью, а потому способно точно передавать изображение. Однако стоимость данного стекла значительно дороже обычного. '
						}
					]
				}
			]
		}
	}
		
	let delivetyStep = function(stepId, price){
		return {
			id:stepId,
			title:'Доставка',
			calcFunc:'defaultCalc',
			stepElements:[
				{
					id:`element-1-${stepId}`,
					items:[
						{
							id:`item-1-element-1-${stepId}`,
							title:'Да',
							price:price
						},
						{
							id:`item-2-element-1-${stepId}`,
							title:'Нет',
							isSelected:true
						}
					]
				}
			]
		}
	}

	let installationStep = function(stepId, price){
	return {
		id:stepId,
		title:'Монтаж',
		doubleWidthSizeInMidle:true,
		calcFunc:'priceMultiplyByAreaSizeCalc',
		stepElements:[
			{
				id:`element-1-${stepId}`,
				items:[
					{
						id:`item-1-element-1-${stepId}`,
						title:'Надо',
						price:price
					},
					{
						id:`item-2-element-1-${stepId}`,
						title:'Я сам поставлю',
						isSelected:true
					}
				]
			}
		]
	}
}
	
	

	return {
		init: function(calculatorConfigObj){
			calculatorConfig = calculatorConfigObj;
			
			orderSteps = [
			{
				id:'step-1',
				title:'Выбор изделия',
				stepElements:[{
					id:'element-2',
					itemChange:'eventRefreshSteps',
					items:[
						{
							id:'item-3',
							title:'Душевая кабина',
							childSteps:[
								glassThicknessStep('step-4'),
								glassTypeStep('step-9'),
								{
									id:'step-16',
									title:'Тип кабины, размер',
									tripleWidthSize:true,
									itemChange:'eventCabinTypes',
									stepElements:[
										{
											id:'element-16-2',
											itemChange:'eventCabinTypes',
											items: [
												{
													id:'item-16-2-1',
													number:1,
													title:'Название',
													childSteps:[
														printingTypeStep('step-17', calculatorConfig.SHOWER_CABIN_PHOTO_PRINTING_PRICE, calculatorConfig.SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE),
														getHandleTypeStep('step-24', 1)
													],
													sizes:[
														{
															title:'Высота',
															name:'h',
															enteredValue:''
														},
														{
															title:'Параметр',
															name:'w',
															enteredValue:'',
															maxValue:1000
														}
													],
													additionalParamatres:[
														{
															id:'additional-parametr-16-2-1',
															title:'Наличие верхней штанги',
															items:[
																{
																	id:'additional-item-16-2-1',
																	title:'Да'
																},
																{
																	id:'additional-item-16-2-2',
																	title:'Нет',
																	isSelected:true
																}
															]
														}
													]
												},
												{
													id:'item-16-2-2',
													number:2,													
													title:'Название',
													childSteps:[
														printingTypeStep('step-17', calculatorConfig.SHOWER_CABIN_PHOTO_PRINTING_PRICE, calculatorConfig.SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE),
														getHandleTypeStep('step-24', 21)
													],
													isSelected:true,
													sizes:[
														{
															title:'Высота',
															name:'h',
															enteredValue:''
														},
														{
															title:'Дверь',
															name:'d',
															enteredValue:'',
															maxValue:1000
														}
													]
												},
												{
													id:'item-16-2-3',
													number:3,
													title:'Название',
													childSteps:[
														printingTypeStep('step-17', calculatorConfig.SHOWER_CABIN_PHOTO_PRINTING_PRICE, calculatorConfig.SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE),
														getHandleTypeStep('step-24', 21)
													],
													sizes:[
														{
															title:'Высота',
															name:'h',
															enteredValue:''
														},
														{
															title:'Дверь',
															name:'d',
															enteredValue:'',
															maxValue:1000
														},
														{
															title:'Параметр',
															name:'l',
															enteredValue:''
														}
													],
													additionalParamatres:[
														{
															id:'additional-parametr-16-2-3',
															title:'Наличие верхней штанги',
															items:[
																{
																	id:'additional-item-16-2-3',
																	title:'Да'
																},
																{
																	id:'additional-item-16-2-4',
																	title:'Нет',
																	isSelected:true
																}
															]
														}
													]
												},
												{
													id:'item-16-2-4',
													number:4,
													title:'Название',
													sizes:[
														{
															title:'Высота',
															name:'h',
															enteredValue:''
														},
														{
															title:'Параметр',
															name:'l',
															enteredValue:'',
															maxValue:1000
														},
														{
															title:'Дверь',
															name:'d',
															enteredValue:''
														},
														{
															title:'Параметр',
															name:'w',
															enteredValue:''
														}
													],
													additionalParamatres:[
														{
															id:'additional-parametr-16-2-4',
															title:'Наличие верхней штанги',
															items:[
																{
																	id:'additional-item-16-2-5',
																	title:'Да'
																},
																{
																	id:'additional-item-16-2-6',
																	title:'Нет',
																	isSelected:true
																}
															]
														}
													]
												},
												{
													id:'item-16-2-5',
													number:5,
													title:'Название',
													childSteps:[
														printingTypeStep('step-17', calculatorConfig.SHOWER_CABIN_PHOTO_PRINTING_PRICE, calculatorConfig.SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE),
														getHandleTypeStep('step-24', 21)
													],
													sizes:[
														{
															title:'Высота',
															name:'h',
															enteredValue:''
														},
														{
															title:'Параметр',
															name:'f',
															enteredValue:'',
															maxValue:1000
														},
														{
															title:'Параметр',
															name:'l',
															enteredValue:''
														},
														{
															title:'Дверь',
															name:'d2',
															enteredValue:''
														},
														{
															title:'Дверь',
															name:'d',
															enteredValue:''
														}
													],
													additionalParamatres:[
														{
															id:'additional-parametr-16-2-5',
															title:'Наличие верхней штанги',
															items:[
																{
																	id:'additional-item-16-2-7',
																	title:'Да'
																},
																{
																	id:'additional-item-16-2-8',
																	title:'Нет',
																	isSelected:true
																}
															]
														}
													]
												},
												{
													id:'item-16-2-6',
													number:6,
													title:'Название',
													childSteps:[
														printingTypeStep('step-17', calculatorConfig.SHOWER_CABIN_PHOTO_PRINTING_PRICE, calculatorConfig.SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE),
														getHandleTypeStep('step-24', 21)
													],
													sizes:[
														{
															title:'Высота',
															name:'h',
															enteredValue:''
														},
														{
															title:'Параметр',
															name:'w',
															enteredValue:'',
															maxValue:1000
														},
														{
															title:'Параметр',
															name:'l',
															enteredValue:''
														},
														{
															title:'Дверь',
															name:'d',
															enteredValue:''
														}
													],
													additionalParamatres:[
														{
															id:'additional-parametr-16-2-6',
															title:'Наличие верхней штанги',
															items:[
																{
																	id:'additional-item-16-2-9',
																	title:'Да'
																},
																{
																	id:'additional-item-16-2-10',
																	title:'Нет',
																	isSelected:true
																}
															]
														}
													]
												},
												{
													id:'item-16-2-7',
													number:7,
													title:'Название',
													childSteps:[
														printingTypeStep('step-17', calculatorConfig.SHOWER_CABIN_PHOTO_PRINTING_PRICE, calculatorConfig.SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE),
														getHandleTypeStep('step-24', 21)
													],
													sizes:[
														{
															title:'Высота',
															name:'h',
															enteredValue:''
														},
														{
															title:'Дверь',
															name:'d',
															enteredValue:'',
															maxValue:1000
														},
														{
															title:'Параметр',
															name:'l',
															enteredValue:''
														},
														{
															title:'Параметр',
															name:'w',
															enteredValue:''
														}
													]
												},
												{
													id:'item-16-2-8',
													number:8,
													title:'Угловая душевая кабина',
													childSteps:[
														printingTypeStep('step-17', calculatorConfig.SHOWER_CABIN_PHOTO_PRINTING_PRICE, calculatorConfig.SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE),
														getHandleTypeStep('step-24', 21)
													],
													sizes:[
														{
															title:'Высота',
															name:'h',
															enteredValue:''
														},
														{
															title:'Параметр',
															name:'f',
															enteredValue:'',
															maxValue:1000
														},
														{
															title:'Дверь',
															name:'d2',
															enteredValue:''
														},
														{
															title:'Дверь',
															name:'d',
															enteredValue:''
														},
														{
															title:'Параметр',
															name:'l',
															enteredValue:''
														}
													]
												}
											]
										}
									]
								},
								{
									id:'step-25',
									title:'Цвет ручки',
									stepElements:[
										{
											id:'element-26',
											items: [
												{
													id:'item-27',
													title:'Матовая нержавеющая сталь',
													isSelected:true
												},
												{
													id:'item-28',
													title:'Другой цвет'
												}
											]
										}
									]
								},
								delivetyStep('step-25-2', calculatorConfig.SHOWER_CABIN_DELIVERY_PRICE),
								installationStep('step-25-3', calculatorConfig.SHOWER_CABIN_INSTALATION_PRICE)
							]
						},
						{
							id:'item-29',
							title:'Скинали',
							isSelected:true,
							childSteps:[
								glassType2Step('step-30'),
								printingTypeStep('step-33',calculatorConfig.SKINALI_PHOTO_PRINTING_PRICE, calculatorConfig.SKINALI_MONOCHROMATIC_PAINTING_PRICE),
								{
									id:'step-panel-size',
									title:'Количество панелей / размер',
									mainParamsCalcFunc:'panelSizeMainParamsCalc',
									calcFunc:'panelSizeCalc',
									doubleWidthSize:true,
									stopRender:true,
									stepElements:[
										{
											id:'element-40',
											title:'Количество:',
											itemChange:'eventAppendSizeElements',
											items:[{
													id:'item-40',
													title:'1',
													isSelected:true
												},
												{
													id:'item-41',
													title:'2'
												},
												{
													id:'item-42',
													title:'3'
												},
												{
													id:'item-43',
													title:'4'
												}
											],
											enteredValues:[
												{
													number:1,
													w: undefined,
                                                    h: undefined,
                                                    hardening: false
												},
												{
													number:2,
                                                    w: undefined,
                                                    h: undefined,
                                                    hardening: false
												},
												{
													number:3,
                                                    w: undefined,
                                                    h: undefined,
                                                    hardening: false
												},
												{
													number:4,
                                                    w: undefined,
                                                    h: undefined,
                                                    hardening: false
												}
											]
										}
									]
								},
								{
									id:'step-44',
									title:'Рейлинги / розетки',
									calcFunc:'railsAndSocketsCalc',
                                    stepElements: [
                                        /*
										{
											id:'element-45',
											title:'Монтаж рейлингов:',
											info:'Данная опция подразумевает высверливание в стекле отверстий необходимого диаметра под рейлинги Клиента. ',
											itemChange:'eventInstallationOfRails',
											enteredValue:'',
											items:[{
													id:'item-46',
													title:'Да',
                                                    price: calculatorConfig.SKINALI_ONE_RAILS_INSTALATION_PRICE
												},
												{
													id:'item-47',
													title:'Нет',
													isSelected:true
												}
											]
										},*/
										{
											id:'element-48',
											title: 'Выпил под блоки розеток:',
											itemChange:'eventSocketsCount',
											enteredValue:'',
											items:[{
													id:'item-49',
													title:'Да',
													socketsBloks:[
														{
															number: 1,
															title:'блок резеток из 1 резетки',
															blockCount: '',
															isSelected: false
														},
														{
															number: 2,
															title:'блок резеток из 2 резетки',
															blockCount: '',
															isSelected: false
														},
														{
															number: 3,
															title:'блок резеток из 3 резетки',
															blockCount: '',
															isSelected: false
														},
														{
															number: 4,
															title:'блок резеток из 4 резетки',
															blockCount: '',
															isSelected: false
														},
														{
															number: 5,
															title:'блок резеток из 5 резетки',
															blockCount: '',
															isSelected: false
														}
													]
												},
												{
													id:'item-50',
													title:'Нет',
													isSelected:true
												}
											]
										}
									]
								},
								{
									id:'step-51',
									title:'Тип крепления',
									calcFunc:'mountingTypeCalc',
									stepElements:[
										{
											id:'element-52',
											items:[{
												id:'item-53',
												title:'Клей',
												itemType:'glue',
												info:'Использование данного типа крепления требует выровненные и предварительно подготовленные поверхности стен. Необходимо учитывать, что в случае необходимости демонтировать изделие, данные работы будет выполнить достаточно сложно.',
												isSelected:true
											},
											{
												id:'item-54',
												title:'Сквозное',
												itemType:'drilling',
												info:'Для такого крепежа в стекле высверливаются отверстия и изделие закрепляется на стену посредством специальных крепежей. '
											}]
										}
									]
								},
								{
									id:'step-59',
									title:'Замер',
									info:'В случае дальнейшего заключении Договора сумма замера вычитается из общей стоимости Договора',
									calcFunc:'defaultCalc',
									stepElements:[
										{
											id:'element-60',
											itemChange:'eventRefreshSteps',
											items:[
												{
													id:'item-62',
													title:'Надо',
													price:calculatorConfig.SKINALI_METRING_PRICE,
													childSteps:[
														delivetyStep('step-59-2', calculatorConfig.SKINALI_DELIVERY_PRICE),
														installationStep('step-59-3', calculatorConfig.SKINALI_INSTALATION_PRICE)
													]
												},
												{
													id:'item-63',
													title:'Не надо',
													isSelected:true,
													childSteps:[
														delivetyStep('step-59-4', calculatorConfig.SKINALI_DELIVERY_PRICE)
													]
												}
											]
										}
									]
								}
							]
						},
						{
							id:'item-64',
							title:'Двери',
							childSteps:[
								{
									id:'step-65',
									title:'Тип конструкции',
									stepElements:[
										{
											id:'element-66',
											itemChange:'eventRefreshSteps',
											items: [
												{
													id:'item-67',
													title:'Раздвижные двери',
													isSelected:true,
													childSteps:[
														{
															id:'step-68',
															title:'Механизм',
															stepElements:[
																{
																	id:'element-69',
																	items:[
																		{
																			id:'item-70',
																			title:'Система Слайдер',
																			info:'Данная система является &quot;закрытой&quot;. Все крепежи, ролики и каретки спрятаны за горизонтальной декоративной алюминиевой крышкой. ',
																			isSelected:true
																		},
																		{
																			id:'item-71',
																			title:'Система ГЛАСС',
																			info:'Данная система является &quot;открытой&quot;. Основа системы - это трек (труба). Все точечные крепежи, держатели и каретки визуально просматриваются. '
																		},
																		{
																			id:'item-72',
																			title:'Не имеет значения'
																		}
																	]
																}
															]
														},
														glassTypeStep('step-69-2'),
														{
															id:'step-69-3',
															title:'Тип, размер 1',
															doubleWidthSize:true,
															stepElements:[
																{
																	id:'element-69-3-1',
																	itemChange:'eventSlidingDoorTypes',
																	items:[
																			{
																				id:'item-1-element-108',
																				title:'Одностворчатая',
																				number:'1',
																				sizes:[
																					{
																						title:'Высота',
																						name:'h',
																						enteredValue:'',
																						minValue:250,
																						maxValue:2500
																					},
																					{
																						title:'Размер двери',
																						name:'d',
																						enteredValue:'',
																						minValue:250,
																						maxValue:1000
																					}
																				]
																			},
																			{
																				id:'item-2-element-108',
																				title:'Двустворчатая',
																				number:'2',
																				sizes:[
																					{
																						title:'Высота',
																						name:'h',
																						enteredValue:'',
																						minValue:250,
																						maxValue:2500
																					},
																					{
																						title:'Размер двери',
																						name:'d',
																						enteredValue:'',
																						minValue:250,
																						maxValue:1000
																					},
																					{
																						title:'Размер двери',
																						name:'d2',
																						enteredValue:''
																					}
																				]
																			}
																	]
																}
															]
														}
													]
												},
												{
													id:'item-73',
													title:'Распашные двери',
													childSteps:[
														{
															id:'step-74',
															title:'Вид петель',
															stepElements:[
																{
																	id:'element-75',
																	items:[
																		{
																			id:'item-76-element-75',
																			title:'Боковые петли',
																			isSelected:true
																		},
																		{
																			id:'item-77-element-75',
																			title:'Маятниковые петли (фитинги)'
																		}
																	]
																}
															]
														},
														glassTypeStep('step-74-2'),
														{
															id:'step-74-3',
															title:'Тип, размер 2',
															doubleWidthSize:true,
															stepElements:[
																{
																	id:'element-108',
																	itemChange:'eventSwingDoorsTypes',
																	items:[
																			{
																				id:'item-1-element-108',
																				title:'Одностворчатая',
																				number:'1',
																				sizes:[
																					{
																						title:'Высота',
																						name:'h',
																						enteredValue:'',
																						minValue:250,
																						maxValue:2500
																					},
																					{
																						title:'Размер двери',
																						name:'d',
																						enteredValue:'',
																						minValue:250,
																						maxValue:1000
																					}
																				],
																				additionalParamatres:[
																					{
																						id:'additional-parametr-108-1',
																						title:'Рама для одностворчатых дверей',
																						text:'В рассчете учитывается цена за раму под полотно не более 2000х900 мм',
																						items:[
																							{
																								id:'additional-item-108-1-1',
																								title:'Без рамы',
																								isSelected:true
																							},
																							{
																								id:'additional-item-108-1-2',
																								title:'Деревянная'
																							},
																							{
																								id:'additional-item-108-1-3',
																								title:'Алюминиевая серая'
																							},
																							{
																								id:'additional-item-108-1-3',
																								title:'Алюминиевая (цвет RAL)'
																							}
																						]
																					}
																				]
																			},
																			{
																				id:'item-2-element-108',
																				title:'Двустворчатая',
																				number:'2',
																				sizes:[
																					{
																						title:'Высота',
																						name:'h',
																						enteredValue:'',
																						minValue:250,
																						maxValue:2500
																					},
																					{
																						title:'Размер двери',
																						name:'d',
																						enteredValue:'',
																						minValue:250,
																						maxValue:1000
																					},
																					{
																						title:'Размер двери',
																						name:'d2',
																						enteredValue:''
																					}
																				]
																			}
																	]
																}
															]
															
														}
													]
												}
											]
										}
									]
								},
								printingTypeStep('step-91', calculatorConfig.DOORS_PHOTO_PRINTING_PRICE, calculatorConfig.DOORS_MONOCHROMATIC_PAINTING_PRICE),
								getHandleTypeStep('step-98', 21),
								{
									id:'step-99',
									title:'Цвет ручки',
									stepElements:[
										{
											id:'element-100',
											items: [
												{
													id:'item-101',
													title:'Матовая нержавеющая сталь',
													isSelected:true
												},
												{
													id:'item-102',
													title:'Другой цвет'
												}
											]
										}
									]
								},
								delivetyStep('step-99-1', calculatorConfig.DOORS_DELIVERY_PRICE),
								installationStep('step-99-2', calculatorConfig.DOORS_INSTALATION_PRICE)
							]
						}
					]
				}]
			},
			{
				id:'step-112',
				title:'Стоимость заказа',
				doubleWidthSize:true,
				isTotalPriceStep:true,
				stepElements:[
					{
						id:'element-113',
						priceBlock:0.00
					},
					{
						id:'element-114',
						textBlockCenter:'* Цена является ориентировочной и после обсуждения с менеджером может быть скорректирована'
					}
				]
			}
			];
		},
		getOrderSteps: function(){			
			return orderSteps;
		}
	};
}());