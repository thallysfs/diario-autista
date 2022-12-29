import {Button , Text, IButtonProps} from 'native-base'

interface ButtonProps extends IButtonProps{
  title: string;
  type?: 'success' | 'error' | 'info'
}

export function MyButton({title, type='success', ...rest}: ButtonProps){
  var ColorBg
  var ColorPressed
  var ColorFont

  if(type === 'success') {
    ColorBg = 'primary.50'
    ColorPressed = 'yellow.50'
    ColorFont = 'tertiary.50'

  } else if (type === 'error') {
    ColorBg = 'tertiary.200'
    ColorPressed = 'red.400'
    ColorFont = 'white'
  } else {
    ColorBg = 'tertiary.300'
    ColorPressed = 'info.300'
    ColorFont = 'white'
  }

  return (
    <Button 
      bg={ColorBg}
      size="lg" 
      _pressed={{ bg: ColorPressed }}
      {...rest} 
    >
    <Text 
      color={ColorFont}
      fontSize={14}           
      fontFamily="heading"
      fontWeight={500}
    >
      {title}
    </Text>
  </Button>
  )
}
