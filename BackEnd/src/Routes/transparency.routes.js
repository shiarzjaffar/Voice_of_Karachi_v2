import express from "express";
import { Report } from "../Models/Report.js";

export const transparencyRouter = express.Router();

/*
==================================================
Utility Functions
==================================================
*/

const extractCoordinates = (report) => {

    // New structure
    if (
        report?.coordinates &&
        typeof report.coordinates.lat === "number" &&
        typeof report.coordinates.lng === "number"
    ) {
        return {
            lat: report.coordinates.lat,
            lng: report.coordinates.lng,
        };
    }

    // Legacy format
    if (typeof report?.location === "string") {

        const match = report.location.match(
            /Lat:\s*(-?\d+(\.\d+)?)\s*,\s*Lng:\s*(-?\d+(\.\d+)?)/i
        );

        if (match) {

            return {
                lat: Number(match[1]),
                lng: Number(match[3]),
            };

        }

    }

    return null;

};

/*
==================================================
Dashboard Statistics
==================================================
*/

const getDashboardStats = async () => {

    const stats = await Report.aggregate([

        {

            $group: {

                _id: null,

                total: {
                    $sum: 1,
                },

                pending: {

                    $sum: {

                        $cond: [

                            { $eq: ["$status", "Pending"] },

                            1,

                            0,

                        ],

                    },

                },

                inProgress: {

                    $sum: {

                        $cond: [

                            { $eq: ["$status", "In Progress"] },

                            1,

                            0,

                        ],

                    },

                },

                closed: {

                    $sum: {

                        $cond: [

                            { $eq: ["$status", "Closed"] },

                            1,

                            0,

                        ],

                    },

                },

            },

        },

    ]);

    return (

        stats[0] || {

            total: 0,

            pending: 0,

            inProgress: 0,

            closed: 0,

        }

    );

};

/*
==================================================
Department Performance
==================================================
*/

const getDepartmentPerformance = async () => {

    return await Report.aggregate([

        {

            $match: {

                department: {

                    $exists: true,

                    $ne: null,

                },

            },

        },

        {

            $group: {

                _id: "$department",

                total: {

                    $sum: 1,

                },

                pending: {

                    $sum: {

                        $cond: [

                            { $eq: ["$status", "Pending"] },

                            1,

                            0,

                        ],

                    },

                },

                inProgress: {

                    $sum: {

                        $cond: [

                            { $eq: ["$status", "In Progress"] },

                            1,

                            0,

                        ],

                    },

                },

                resolutionDays: {
    $avg: {
        $cond: [
            {
                $and: [
                    { $eq: ["$status", "Closed"] },
                    { $ne: ["$assignedAt", null] },
                    { $ne: ["$reportClosedAt", null] }
                ]
            },
            {
                $divide: [
                    {
                        $subtract: [
                            "$reportClosedAt",
                            "$assignedAt"
                        ]
                    },
                    1000 * 60 * 60 * 24
                ]
            },
            null
        ]
    }
},

                closed: {

                    $sum: {

                        $cond: [

                            { $eq: ["$status", "Closed"] },

                            1,

                            0,

                        ],

                    },

                },

            },

        },

        {

            $project: {

                _id: 0,

                department: "$_id",

                total: 1,

                pending: 1,

                inProgress: 1,

                closed: 1,

                resolutionRate: {

                    $round: [

                        {

                            $cond: [

                                {

                                    $eq: [

                                        "$total",

                                        0,

                                    ],

                                },

                                0,

                                {

                                    $multiply: [

                                        {

                                            $divide: [

                                                "$closed",

                                                "$total",

                                            ],

                                        },

                                        100,

                                    ],

                                },

                            ],

                        },

                        1,

                    ],

                },

                averageDays: {
    $round: [
        "$resolutionDays",
        1
    ]
},

            },

        },

        {

            $sort: {

                total: -1,

            },

        },

    ]);

};

/*
==================================================
Category Distribution
==================================================
*/

const getCategoryDistribution = async () => {

    return await Report.aggregate([

        {

            $match: {

                category: {

                    $exists: true,

                    $ne: null,

                },

            },

        },

        {

            $group: {

                _id: "$category",

                reports: {

                    $sum: 1,

                },

            },

        },

        {

            $project: {

                _id: 0,

                category: "$_id",

                reports: 1,

            },

        },

        {

            $sort: {

                reports: -1,

            },

        },

    ]);

};

/*
==================================================
Monthly Trend
==================================================
*/

const getMonthlyTrend = async () => {

    const monthlyAggregation = await Report.aggregate([

        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                reports: {
                    $sum: 1,
                },
            },
        },

        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1,
            },
        },

    ]);

    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const currentDate = new Date();

    const monthlyTrend = [];

    for (let i = 6; i >= 0; i--) {

        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - i,
            1
        );

        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const existing = monthlyAggregation.find(
            item =>
                item._id.month === month &&
                item._id.year === year
        );

        monthlyTrend.push({
            month: monthNames[month - 1],
            reports: existing ? existing.reports : 0,
        });

    }

    return monthlyTrend;

};

/*
==================================================
District Comparison
==================================================
*/

const getDistrictComparison = async () => {

    const reports = await Report.find(
        {},
        {
            location: 1,
        }
    );

    const districtMap = new Map();

    for (const report of reports) {

        const location = report.location || "";

        let district = "Other";

        if (location.includes("Karachi District"))
            district = "South";

        else if (location.includes("Korangi District"))
            district = "Korangi";

        else if (location.includes("Malir District"))
            district = "Malir";

        else if (location.includes("Gulshan District"))
            district = "East";

        else if (location.includes("Nazimabad District"))
            district = "Central";

        else if (location.includes("Keamari District"))
            district = "Kemari";

        else if (location.includes("West District"))
            district = "West";

        districtMap.set(
            district,
            (districtMap.get(district) || 0) + 1
        );

    }

    return [...districtMap.entries()]
        .map(([district, reports]) => ({
            district,
            reports,
        }))
        .sort((a, b) => b.reports - a.reports);

};

/*
==================================================
Complaint Hotspots
==================================================
*/

const getComplaintHotspots = async () => {

    const reports = await Report.find(
        {},
        {
            location: 1,
            coordinates: 1,
            status: 1,
        }
    );

    const hotspotMap = new Map();

    for (const report of reports) {

        const coords = extractCoordinates(report);

        if (!coords) continue;

        const key = report.location || "Unknown";

        if (!hotspotMap.has(key)) {

            hotspotMap.set(key, {

                area: key,

                lat: coords.lat,

                lng: coords.lng,

                reports: 0,

                resolvedCount: 0,

            });

        }

        const hotspot = hotspotMap.get(key);

        hotspot.reports++;

        if (report.status === "Closed") {

            hotspot.resolvedCount++;

        }

    }

    return Array.from(hotspotMap.values())

        .map(item => ({

            area: item.area,

            lat: item.lat,

            lng: item.lng,

            reports: item.reports,

            resolved: Number(

                (
                    (item.resolvedCount /
                        item.reports) *
                    100
                ).toFixed(1)

            ),

        }))

        .sort((a, b) => b.reports - a.reports)

        .slice(0, 10);

};

/*
==================================================
Heatmap Data
==================================================
*/

const getHeatmapData = async () => {

    const reports = await Report.find(
        {},
        {
            location: 1,
            coordinates: 1,
        }
    );

    const heatmap = [];

    for (const report of reports) {

        const coords = extractCoordinates(report);

        if (!coords) continue;

        heatmap.push({

            lat: coords.lat,

            lng: coords.lng,

            intensity: 1,

        });

    }

    return heatmap;

};

/*
==================================================
Recent Reports
==================================================
*/

const getRecentReports = async () => {

    return await Report.find()

        .sort({

            createdAt: -1,

        })

        .limit(5)

        .select(

            "_id title category location status createdAt"

        );

};

/*
==================================================
Resolution Performance
==================================================
*/

const getResolutionPerformance = (stats) => {

    return {

        total: stats.total,

        resolved: stats.closed,

        pending: stats.pending,

        inProgress: stats.inProgress,

        resolutionRate:

            stats.total === 0

                ? 0

                : Number(

                    (

                        (stats.closed / stats.total) *

                        100

                    ).toFixed(1)

                ),

    };

};

/*
==================================================
Transparency Dashboard
==================================================
*/

transparencyRouter.get("/dashboard", async (req, res) => {

    try {

        const [

            stats,

            departments,

            categories,

            monthlyTrend,

            districtComparison,

            complaintHotspots,

            heatmap,

            recentReports,

        ] = await Promise.all([

            getDashboardStats(),

            getDepartmentPerformance(),

            getCategoryDistribution(),

            getMonthlyTrend(),

            getDistrictComparison(),

            getComplaintHotspots(),

            getHeatmapData(),

            getRecentReports(),

        ]);

        const resolutionPerformance =

            getResolutionPerformance(stats);

        return res.status(200).json({

            success: true,

            stats,

            departments,

            categories,

            monthlyTrend,

            resolutionPerformance,

            districtComparison,

            complaintHotspots,

            heatmap,

            recentReports,

        });

    }

    catch (error) {

        console.error(

            "Transparency Dashboard Error:",

            error

        );

        return res.status(500).json({

            success: false,

            message:

                "Failed to load transparency dashboard.",

            error: error.message,

        });

    }

});
