import { ResponsivePie } from '@nivo/pie'
import { cn } from "@/lib/utils"
import { maxAvaliableHoursUsage } from '@/global'

interface ICircleGraphic {
  className?: string
  remaningMinutes: number
  remaningHours: number
  title: string
}


//usage, total
const colors = ["#0764D0", "#465F87"]
const insideTextColor = "#D4DCE5"

/**
 * 
 * @param param0 
 * @returns 
 */
export const CircleGraphic = ({ className, remaningMinutes, remaningHours, title }: ICircleGraphic) => {
  const remaning = remaningHours + (remaningMinutes / 60)
  const used = maxAvaliableHoursUsage - remaning

  //1 6//quanto sobra
  const usedFormatted = `${Math.floor(used)}h ${((used % 1) * 60).toFixed(0)}m`
  const remaningFormatted = `${remaningHours}h ${(remaningMinutes)}m`

  const data = [
    {
      id: 'used',
      // label: 'Used',
      label: `Used - ${usedFormatted}`,
      value: used.toFixed(2),
      //formatar para mostrar o valor
      // formattedValue: `${maxAvaliableHoursUsage - hours}:${1-(remaning%1)}`
    },
    {
      id: 'remaning',
      //label: 'Remaning',
      label: `Remanig - ${remaningFormatted}`,
      value: remaning.toFixed(2),
      color: 'hsl(100, 70%, 50%)',
    },
  ];

  return (
    <div className={cn("flex-1 h-[250px]", className)}>
      <h2>{title}</h2>
      <div className='flex justify-start h-[250px]'>

        <ResponsivePie
          data={data}
          colors={colors}

          margin={{ top: 40, right: 80, bottom: 80, left: -80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          arcLabelsTextColor={insideTextColor}

          activeOuterRadiusOffset={8}
          borderWidth={2}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          //formação da parte de fora
          enableArcLinkLabels={false}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          // arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}

          legends={[
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 40,
              translateY: 15,
              itemWidth: 112,
              itemHeight: 28,
              itemsSpacing: 0,
              symbolSize: 20,
              itemDirection: 'left-to-right',
              itemTextColor: '#DDD',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#888'
                  }
                }
              ],
            }
          ]}
        />
      </div>
    </div>
  )
}