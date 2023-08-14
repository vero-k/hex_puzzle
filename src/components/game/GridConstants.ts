export const BASEIMGPATH: string = 'colorstreet.jpg'
export const BASEIMGWIDTH: number =  1000
export const BASEIMGHEIGHT: number =  1000

export const GRIDWIDTHCOUNT: number = 20
export const GRIDHEIGHTCOUNT: number = 12
export const GRIDCOUNT: number = GRIDHEIGHTCOUNT * GRIDWIDTHCOUNT



export const RADIUS: number = 1.0
export const HEXWIDTH: number = 2.0 * RADIUS
export const HEXHEIGHT: number = Math.sqrt(3) * RADIUS
export const HORIZONTAL_SPACING: number = HEXWIDTH * 3.0 / 4.0
export const VERTICAL_SPACING: number = HEXHEIGHT


export const GRIDWIDTH: number = (GRIDWIDTHCOUNT -1) * HORIZONTAL_SPACING + HEXWIDTH
export const GRIDHEIGHT: number = GRIDHEIGHTCOUNT * HEXHEIGHT + HEXHEIGHT / 2.0


export const STARTING_HEX_COMPLETED = [0, 1, 11, 12, 132, 143]
export const STARTING_HEX_BASE = [0, 1, 11, 12, 132, 143]
export const STARTING_HEX_GROUND = [0, 1, 11, 12, 132, 143]

export const STARTING_TILE = 0
export const NEIGHBOURS_TO_STARTING = [1, 10]