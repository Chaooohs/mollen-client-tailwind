
export const categoryUkr = (b) => {
  switch (b) {
    case "man":
      return "чоловiкам"
    case "women":
      return "жiнкам"
    case "kids":
      return "дiтям"
    case "home":
      return "дiм"
    case "clothes":
      return "одяг"
    case "accessories":
      return "аксесуари"
    case "cosmetics":
      return "косметика"
    case "lounge":
      return "вітальня"
    case "bathroom":
      return "ванна кімната"
    case "bedroom":
      return "спальня"
    case "kitchen":
      return "кухня"
    case "black":
      return "чорний"
    case "blue":
      return "синiй"
    case "yellow":
      return "жовтий"
    case "green":
      return "зелений"
    case "red":
      return "червоний"
    case "gray":
      return "сірий"
    case "orange":
      return "помаранчевий"
    case "coral":
      return "кораловий"
    case "violet":
      return "фіолетовий"
    case "white":
      return "бiлий"
    case "pink":
      return "рожевий"
    case "none":
      return "безбарвний"
    default:
      return b
  }
}