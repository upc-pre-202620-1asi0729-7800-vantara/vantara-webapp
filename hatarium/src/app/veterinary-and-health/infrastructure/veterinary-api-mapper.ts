import { Appointment } from '../domain/model/appointment.entity';
import { MedicalRecord } from '../domain/model/medical-record.entity';
import { Treatment } from '../domain/model/treatment.entity';
import { AppointmentResource, MedicalRecordResource, TreatmentResource } from './veterinary-response';

export class VeterinaryApiMapper {
  public static toAppointmentEntity(resource: AppointmentResource): Appointment {
    const entity = new Appointment();
    entity.id = resource.id;
    entity.rancherId = resource.rancherId;
    entity.veterinarianId = resource.veterinarianId;
    entity.requestedBy = resource.requestedBy;
    entity.scheduledAt = resource.scheduledAt;
    entity.reason = resource.reason;
    entity.status = resource.status;
    entity.cancellationReason = resource.cancellationReason || '';
    entity.createdAt = resource.createdAt || '';
    return entity;
  }

  public static toMedicalRecordEntity(resource: MedicalRecordResource): MedicalRecord {
    const entity = new MedicalRecord();
    entity.id = resource.id;
    entity.appointmentId = resource.appointmentId || '';
    entity.animalId = resource.animalId;
    entity.veterinarianId = resource.veterinarianId;
    entity.recordedAt = resource.recordedAt;
    entity.symptoms = resource.symptoms;
    entity.diagnosis = resource.diagnosis;
    entity.severity = resource.severity;
    entity.healthStatus = resource.healthStatus;
    entity.notes = resource.notes || '';
    return entity;
  }

  public static toTreatmentEntity(resource: TreatmentResource): Treatment {
    const entity = new Treatment();
    entity.id = resource.id;
    entity.medicalRecordId = resource.medicalRecordId;
    entity.animalId = resource.animalId;
    entity.medicationId = resource.medicationId;
    entity.treatmentType = resource.treatmentType;
    entity.dose = resource.dose;
    entity.doseUnit = resource.doseUnit;
    entity.route = resource.route;
    entity.frequencyHours = resource.frequencyHours;
    entity.durationDays = resource.durationDays;
    entity.scheduledAt = resource.scheduledAt;
    entity.administeredAt = resource.administeredAt || '';
    entity.nextDueAt = resource.nextDueAt || '';
    entity.status = resource.status;
    entity.instructions = resource.instructions || '';
    return entity;
  }
}
