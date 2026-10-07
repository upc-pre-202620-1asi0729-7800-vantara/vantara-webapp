import { Service } from '@angular/core';

import { LivestockReport } from '../domain/model/livestock-report.entity';
import { FeedingReport } from '../domain/model/feeding-report.entity';
import { ReportFilter } from '../domain/model/report-filter.entity';

import { AnimalResource } from '../../livestock-management/infrastructure/animals-response';
import { LotResource } from '../../livestock-management/infrastructure/lots-response';
import { FeedingPlanResource } from '../../livestock-management/infrastructure/feeding-plans-response';
import { FeedingPlanItemResource } from '../../livestock-management/infrastructure/feeding-plan-items-response';
import { FeedingLogResource } from '../../livestock-management/infrastructure/feeding-logs-response';

@Service()
export class ReportsAssembler {

  // ============================================
  // REPORTE DE GANADO
  // ============================================

  toLivestockReport(
    animals: AnimalResource[],
    lots: LotResource[],
    filter: ReportFilter
  ): LivestockReport {

    const report = new LivestockReport();

    const filteredAnimals = animals.filter(animal => {

      if (
        filter.startsOn &&
        animal.registeredAt < filter.startsOn
      ) {
        return false;
      }

      if (
        filter.endsOn &&
        animal.registeredAt > filter.endsOn
      ) {
        return false;
      }

      if (
        filter.lotId &&
        animal.lotId !== filter.lotId
      ) {
        return false;
      }

      if (
        filter.breed &&
        animal.breed !== filter.breed
      ) {
        return false;
      }

      if (
        filter.sex &&
        animal.sex !== filter.sex
      ) {
        return false;
      }

      if (
        filter.status &&
        animal.status !== filter.status
      ) {
        return false;
      }

      return true;
    });


    report.totalAnimals =
      filteredAnimals.length;


    report.averageWeight =
      filteredAnimals.length > 0
        ? filteredAnimals.reduce(
        (total, animal) =>
          total + animal.weight,
        0
      ) / filteredAnimals.length
        : 0;


    report.totalLots =
      new Set(
        filteredAnimals.map(
          animal => animal.lotId
        )
      ).size;


    report.males =
      filteredAnimals.filter(
        animal =>
          animal.sex.toLowerCase() === 'macho'
      ).length;


    report.females =
      filteredAnimals.filter(
        animal =>
          animal.sex.toLowerCase() === 'hembra'
      ).length;


    report.animalsByLot =
      lots
        .filter(lot =>
          filteredAnimals.some(
            animal =>
              animal.lotId === lot.id
          )
        )
        .map(lot => {

          const lotAnimals =
            filteredAnimals.filter(
              animal =>
                animal.lotId === lot.id
            );


          return {

            lotId:
            lot.id,

            lotName:
            lot.name,

            animalCount:
            lotAnimals.length,

            averageWeight:
              lotAnimals.length > 0
                ? lotAnimals.reduce(
                (total, animal) =>
                  total + animal.weight,
                0
              ) / lotAnimals.length
                : 0,

            males:
            lotAnimals.filter(
              animal =>
                animal.sex.toLowerCase() === 'macho'
            ).length,

            females:
            lotAnimals.filter(
              animal =>
                animal.sex.toLowerCase() === 'hembra'
            ).length

          };

        });


    const breeds =
      new Map<string, number>();


    filteredAnimals.forEach(animal => {

      breeds.set(
        animal.breed,
        (breeds.get(animal.breed) ?? 0) + 1
      );

    });


    report.animalsByBreed =
      Array.from(
        breeds.entries()
      ).map(([breed, count]) => ({

        breed,

        count

      }));


    return report;
  }


  // ============================================
  // REPORTE DE ALIMENTACIÓN
  // ============================================

  toFeedingReport(
    feedingPlans: FeedingPlanResource[],
    feedingPlanItems: FeedingPlanItemResource[],
    feedingLogs: FeedingLogResource[],
    animals: AnimalResource[],
    lots: LotResource[],
    filter: ReportFilter
  ): FeedingReport {

    const report =
      new FeedingReport();


    // ============================================
    // 1. FILTRAR PLANES
    // ============================================

    const filteredPlans =
      feedingPlans.filter(plan => {

        if (
          filter.startsOn &&
          plan.startsOn < filter.startsOn
        ) {
          return false;
        }

        if (
          filter.endsOn &&
          plan.startsOn > filter.endsOn
        ) {
          return false;
        }

        if (
          filter.lotId &&
          plan.lotId !== filter.lotId
        ) {
          return false;
        }

        return true;
      });


    const planIds =
      new Set(
        filteredPlans.map(
          plan => plan.id
        )
      );


    // ============================================
    // 2. FILTRAR REGISTROS DE ALIMENTACIÓN
    // ============================================

    const filteredLogs =
      feedingLogs.filter(log => {

        const planId =
          feedingPlanItems.find(
            item =>
              item.id === log.planItemId
          )?.feedingPlanId;


        if (
          !planId ||
          !planIds.has(planId)
        ) {
          return false;
        }


        if (
          filter.startsOn &&
          log.feedAt < filter.startsOn
        ) {
          return false;
        }


        if (
          filter.endsOn &&
          log.feedAt > filter.endsOn
        ) {
          return false;
        }


        if (
          filter.lotId &&
          log.lotId !== filter.lotId
        ) {
          return false;
        }


        return true;

      });


    // ============================================
    // 3. KPIs
    // ============================================

    report.totalPlans =
      filteredPlans.length;


    report.totalFeedingRecords =
      filteredLogs.length;


    report.totalRegisteredConsumption =
      filteredLogs.reduce(
        (total, log) =>
          total + Number(log.quantity),
        0
      );


    // ============================================
    // 4. ANIMALES CON PLAN
    // ============================================

    const animalsWithPlan =
      new Set<string>();


    filteredPlans.forEach(plan => {

      // Plan individual

      if (plan.animalId) {

        animalsWithPlan.add(
          plan.animalId
        );

        return;

      }

      animals
        .filter(
          animal =>
            animal.lotId === plan.lotId
        )
        .forEach(animal =>
          animalsWithPlan.add(
            animal.id
          )
        );

    });


    report.animalsWithPlan =
      animalsWithPlan.size;


    // ============================================
    // 5. CONSUMO POR ALIMENTO
    // ============================================

    const consumptionByFeed =
      new Map<
        string,
        {
          quantity: number;
          unit: string;
        }
      >();


    filteredLogs.forEach(log => {

      const current =
        consumptionByFeed.get(
          log.feedName
        );


      if (current) {

        current.quantity +=
          Number(log.quantity);

      } else {

        consumptionByFeed.set(
          log.feedName,
          {
            quantity:
              Number(log.quantity),

            unit:
            log.unit
          }
        );

      }

    });


    report.consumptionByFeed =
      Array.from(
        consumptionByFeed.entries()
      ).map(
        ([feedName, data]) => ({

          feedName,

          quantity:
          data.quantity,

          unit:
          data.unit

        })
      );


    // ============================================
    // 6. CONSUMO POR LOTE
    // ============================================

    const consumptionByLot =
      new Map<
        string,
        {
          quantity: number;
          unit: string;
        }
      >();


    filteredLogs.forEach(log => {

      const current =
        consumptionByLot.get(
          log.lotId
        );


      if (current) {

        current.quantity +=
          Number(log.quantity);

      } else {

        consumptionByLot.set(
          log.lotId,
          {
            quantity:
              Number(log.quantity),

            unit:
            log.unit
          }
        );

      }

    });


    // ============================================
    // 7. ASEGURAR QUE TODOS LOS LOTES CON PLAN
    //    APAREZCAN EN EL REPORTE
    // ============================================

    filteredPlans.forEach(plan => {

      if (
        !consumptionByLot.has(
          plan.lotId
        )
      ) {

        consumptionByLot.set(
          plan.lotId,
          {
            quantity: 0,
            unit: 'kg'
          }
        );

      }

    });


    // ============================================
    // 8. CONSTRUIR RESULTADO POR LOTE
    // ============================================

    report.consumptionByLot =
      Array.from(
        consumptionByLot.entries()
      ).map(
        ([lotId, data]) => {

          const lot =
            lots.find(
              lot =>
                lot.id === lotId
            );


          const plan =
            filteredPlans.find(
              plan =>
                plan.lotId === lotId
            );


          return {

            lotId,

            lotName:
              lot?.name ?? 'Sin lote',

            planName:
              plan?.name ?? 'Sin plan',

            quantity:
            data.quantity,

            unit:
            data.unit

          };

        }
      );


    return report;
  }

}
