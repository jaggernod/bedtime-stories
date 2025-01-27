import {DayStats} from "./day_stats_fetcher";
import {TimeUtils} from "./time_utils";

const timeUtils = new TimeUtils();

export class WholeStoryFactory {
  create(locale: string): WholeStory {
    if (locale.startsWith("es-419")) {
      return new WholeStorySpanishLatin();
    } else if (locale.startsWith("es")) {
      return new WholeStorySpanish();
    } else {
      return new WholeStoryEnglish();
    }
  }
}

export abstract class WholeStory {
  say(stats: DayStats): string {
    return this.doSay(stats).replace(/\s+/g, " ").trim();
  }

    abstract doSay(stats: DayStats): string;
}

class WholeStorySpanish extends WholeStory {
  doSay(stats: DayStats): string {
    const maxTemp = stats.maxTemperatureOutside;
    const minTemp = stats.minTemperatureOutside;

    const cupsOfTea = `Desde entonces has hecho ${stats.teaBoils} tazas de té. `;
    const cupOfTea = `Desde entonces has hecho ${stats.teaBoils} taza de té. `;

    const tea = stats.teaBoils == 1 ? cupOfTea : cupsOfTea;


    const wakeUp = stats.wakeUpTime == undefined ?
    "Creo que sigues en la cama - levantate." :
    `Hoy te has levantado a las ${timeUtils.formatLocalTime(stats.wakeUpTime)}.`;

    return `
        ${wakeUp}
        ${tea} 
        La temperatura actual en casa es de ${stats.temperatureInside.value} grados centígrados. 
        Lo más frío que ha estado afuera fue de ${minTemp.value}
        grados a las ${timeUtils.formatLocalTime(minTemp.date)} 
        y lo más cálido fue ${maxTemp.value} grados a las ${timeUtils.formatLocalTime(maxTemp.date)}. `;
  }
}

class WholeStorySpanishLatin extends WholeStory {
  doSay(stats: DayStats): string {
    const maxTemp = stats.maxTemperatureOutside;
    const minTemp = stats.minTemperatureOutside;

    const cupsOfTea = `Desde entonces has hervido ${stats.teaBoils} termos para el mate. `;
    const cupOfTea = `Desde entonces has hervido ${stats.teaBoils} termo para el mate. `;

    const tea = stats.teaBoils == 1 ? cupOfTea : cupsOfTea;

    const wakeUp = stats.wakeUpTime == undefined ?
    "Creo que sigues en la cama - levantate." :
    `Hoy te has levantado a las ${timeUtils.formatLocalTime(stats.wakeUpTime)}. ¿Por qué dormiste tan poco?`;

    return `
        ${wakeUp} 
        ${tea} 
        La temperatura actual en casa es de ${stats.temperatureInside.value} grados centígrados.
        Lo más frío que ha estado afuera fue de ${minTemp.value} grados
        a las ${timeUtils.formatLocalTime(minTemp.date)} 
        y lo más cálido fue ${maxTemp.value} grados a las ${timeUtils.formatLocalTime(maxTemp.date)}. ¡Qué frío!`;
  }
}

class WholeStoryEnglish extends WholeStory {
  doSay(stats: DayStats): string {
    const maxTemp = stats.maxTemperatureOutside;
    const minTemp = stats.minTemperatureOutside;

    const cupsOfTea = `Since then you have made ${stats.teaBoils} cups of tea. `;
    const cupOfTea = `Since then you have made ${stats.teaBoils} cup of tea. `;

    const tea = stats.teaBoils == 1 ? cupOfTea : cupsOfTea;

    const wakeUp = stats.wakeUpTime == undefined ?
    "We haven't seen you around the house today." :
    `Today you have woken up at a ${timeUtils.formatLocalTime(stats.wakeUpTime)}.`;

    return `
        ${wakeUp} 
        ${tea}
        Current temperature at home is ${stats.temperatureInside.value} degrees celsius. 
        The coldest it has been outside was ${minTemp.value} degrees at ${timeUtils.formatLocalTime(minTemp.date)}
        and the warmest ${maxTemp.value} degrees at ${timeUtils.formatLocalTime(maxTemp.date)}.`;
  }
}
