import activityDB from "public/images/activities.png";
import admin from "public/images/admins.png";
import aep from "public/images/aeps.png";
import analytics from "public/images/analytics.png";
import manager from "public/images/account-manager.png";
import roaster from "public/images/students.png";
import statusTracker from "public/images/action-tracker.png";
import superAdmin from "public/images/super-admin.png";


export const homeInfoSuperAdmin = [
    {
      activityname: "Super Admin Roster",
      activitystatus: "View and update roster of super admins",
      image: superAdmin,
      url: "/super-admin",
      id: 1,
    },
    {
      activityname: "Admin Roster",
      activitystatus: "View and update roster of admins",
      url: "/admin",
      image: admin,
      id: 2,
    },
    {
      activityname: "Account Manager Roster",
      activitystatus: "View and update roster of account managers",
      image: manager,
      url: "/account-manager",
      id: 3,
    },
    {
      activityname: "Student Roster",
      activitystatus: "View and update roster of students",
      image: roaster,
      url: "/student-roster",
      id: 4,
    },
    {
      activityname: "Activity Database",
      activitystatus: "View and update activities and action maps",
      image: activityDB,
      url: "/activity-database",
      id: 5,
    },

    {
      activityname: "Academic Enrichment Plans (AEPs)",
      activitystatus: "View and update student AEPs",
      image: aep,
      url: "/academic-list",
      id: 6,
    },

    {
      activityname: "Action Tracker",
      activitystatus: "View and update student progress",
      url: "/aep-tracker",
      image: statusTracker,

      id: 7,
    },

    {
      activityname: "Analytics",
      activitystatus: "View analytics for students and staff",
      image: analytics,
      url: "/analytics",
      id: 8,
    },
  ];